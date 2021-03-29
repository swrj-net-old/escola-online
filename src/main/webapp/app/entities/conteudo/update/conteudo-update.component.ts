import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IConteudo, Conteudo } from '../conteudo.model';
import { ConteudoService } from '../service/conteudo.service';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IProfessor } from 'app/entities/professor/professor.model';
import { ProfessorService } from 'app/entities/professor/service/professor.service';
import { IMateria } from 'app/entities/materia/materia.model';
import { MateriaService } from 'app/entities/materia/service/materia.service';

@Component({
  selector: 'jhi-conteudo-update',
  templateUrl: './conteudo-update.component.html',
})
export class ConteudoUpdateComponent implements OnInit {
  isSaving = false;

  turmasSharedCollection: ITurma[] = [];
  professorsSharedCollection: IProfessor[] = [];
  materiasSharedCollection: IMateria[] = [];

  editForm = this.fb.group({
    id: [],
    dataAula: [],
    habilidadesCompetencias: [],
    observacoes: [],
    turmaConteudo: [],
    professorConteudo: [],
    materiaConteudo: [],
  });

  constructor(
    protected conteudoService: ConteudoService,
    protected turmaService: TurmaService,
    protected professorService: ProfessorService,
    protected materiaService: MateriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conteudo }) => {
      this.updateForm(conteudo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conteudo = this.createFromForm();
    if (conteudo.id !== undefined) {
      this.subscribeToSaveResponse(this.conteudoService.update(conteudo));
    } else {
      this.subscribeToSaveResponse(this.conteudoService.create(conteudo));
    }
  }

  trackTurmaById(index: number, item: ITurma): number {
    return item.id!;
  }

  trackProfessorById(index: number, item: IProfessor): number {
    return item.id!;
  }

  trackMateriaById(index: number, item: IMateria): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConteudo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(conteudo: IConteudo): void {
    this.editForm.patchValue({
      id: conteudo.id,
      dataAula: conteudo.dataAula,
      habilidadesCompetencias: conteudo.habilidadesCompetencias,
      observacoes: conteudo.observacoes,
      turmaConteudo: conteudo.turmaConteudo,
      professorConteudo: conteudo.professorConteudo,
      materiaConteudo: conteudo.materiaConteudo,
    });

    this.turmasSharedCollection = this.turmaService.addTurmaToCollectionIfMissing(this.turmasSharedCollection, conteudo.turmaConteudo);
    this.professorsSharedCollection = this.professorService.addProfessorToCollectionIfMissing(
      this.professorsSharedCollection,
      conteudo.professorConteudo
    );
    this.materiasSharedCollection = this.materiaService.addMateriaToCollectionIfMissing(
      this.materiasSharedCollection,
      conteudo.materiaConteudo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.turmaService
      .query()
      .pipe(map((res: HttpResponse<ITurma[]>) => res.body ?? []))
      .pipe(map((turmas: ITurma[]) => this.turmaService.addTurmaToCollectionIfMissing(turmas, this.editForm.get('turmaConteudo')!.value)))
      .subscribe((turmas: ITurma[]) => (this.turmasSharedCollection = turmas));

    this.professorService
      .query()
      .pipe(map((res: HttpResponse<IProfessor[]>) => res.body ?? []))
      .pipe(
        map((professors: IProfessor[]) =>
          this.professorService.addProfessorToCollectionIfMissing(professors, this.editForm.get('professorConteudo')!.value)
        )
      )
      .subscribe((professors: IProfessor[]) => (this.professorsSharedCollection = professors));

    this.materiaService
      .query()
      .pipe(map((res: HttpResponse<IMateria[]>) => res.body ?? []))
      .pipe(
        map((materias: IMateria[]) =>
          this.materiaService.addMateriaToCollectionIfMissing(materias, this.editForm.get('materiaConteudo')!.value)
        )
      )
      .subscribe((materias: IMateria[]) => (this.materiasSharedCollection = materias));
  }

  protected createFromForm(): IConteudo {
    return {
      ...new Conteudo(),
      id: this.editForm.get(['id'])!.value,
      dataAula: this.editForm.get(['dataAula'])!.value,
      habilidadesCompetencias: this.editForm.get(['habilidadesCompetencias'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      turmaConteudo: this.editForm.get(['turmaConteudo'])!.value,
      professorConteudo: this.editForm.get(['professorConteudo'])!.value,
      materiaConteudo: this.editForm.get(['materiaConteudo'])!.value,
    };
  }
}
