import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IChamada, Chamada } from '../chamada.model';
import { ChamadaService } from '../service/chamada.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IProfessor } from 'app/entities/professor/professor.model';
import { ProfessorService } from 'app/entities/professor/service/professor.service';

@Component({
  selector: 'jhi-chamada-update',
  templateUrl: './chamada-update.component.html',
})
export class ChamadaUpdateComponent implements OnInit {
  isSaving = false;

  alunosSharedCollection: IAluno[] = [];
  turmasSharedCollection: ITurma[] = [];
  professorsSharedCollection: IProfessor[] = [];

  editForm = this.fb.group({
    id: [],
    dataAula: [],
    observacoes: [],
    alunoChamada: [],
    turmaChamada: [],
    professorChamada: [],
  });

  constructor(
    protected chamadaService: ChamadaService,
    protected alunoService: AlunoService,
    protected turmaService: TurmaService,
    protected professorService: ProfessorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chamada }) => {
      this.updateForm(chamada);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chamada = this.createFromForm();
    if (chamada.id !== undefined) {
      this.subscribeToSaveResponse(this.chamadaService.update(chamada));
    } else {
      this.subscribeToSaveResponse(this.chamadaService.create(chamada));
    }
  }

  trackAlunoById(index: number, item: IAluno): number {
    return item.id!;
  }

  trackTurmaById(index: number, item: ITurma): number {
    return item.id!;
  }

  trackProfessorById(index: number, item: IProfessor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChamada>>): void {
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

  protected updateForm(chamada: IChamada): void {
    this.editForm.patchValue({
      id: chamada.id,
      dataAula: chamada.dataAula,
      observacoes: chamada.observacoes,
      alunoChamada: chamada.alunoChamada,
      turmaChamada: chamada.turmaChamada,
      professorChamada: chamada.professorChamada,
    });

    this.alunosSharedCollection = this.alunoService.addAlunoToCollectionIfMissing(this.alunosSharedCollection, chamada.alunoChamada);
    this.turmasSharedCollection = this.turmaService.addTurmaToCollectionIfMissing(this.turmasSharedCollection, chamada.turmaChamada);
    this.professorsSharedCollection = this.professorService.addProfessorToCollectionIfMissing(
      this.professorsSharedCollection,
      chamada.professorChamada
    );
  }

  protected loadRelationshipsOptions(): void {
    this.alunoService
      .query()
      .pipe(map((res: HttpResponse<IAluno[]>) => res.body ?? []))
      .pipe(map((alunos: IAluno[]) => this.alunoService.addAlunoToCollectionIfMissing(alunos, this.editForm.get('alunoChamada')!.value)))
      .subscribe((alunos: IAluno[]) => (this.alunosSharedCollection = alunos));

    this.turmaService
      .query()
      .pipe(map((res: HttpResponse<ITurma[]>) => res.body ?? []))
      .pipe(map((turmas: ITurma[]) => this.turmaService.addTurmaToCollectionIfMissing(turmas, this.editForm.get('turmaChamada')!.value)))
      .subscribe((turmas: ITurma[]) => (this.turmasSharedCollection = turmas));

    this.professorService
      .query()
      .pipe(map((res: HttpResponse<IProfessor[]>) => res.body ?? []))
      .pipe(
        map((professors: IProfessor[]) =>
          this.professorService.addProfessorToCollectionIfMissing(professors, this.editForm.get('professorChamada')!.value)
        )
      )
      .subscribe((professors: IProfessor[]) => (this.professorsSharedCollection = professors));
  }

  protected createFromForm(): IChamada {
    return {
      ...new Chamada(),
      id: this.editForm.get(['id'])!.value,
      dataAula: this.editForm.get(['dataAula'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      alunoChamada: this.editForm.get(['alunoChamada'])!.value,
      turmaChamada: this.editForm.get(['turmaChamada'])!.value,
      professorChamada: this.editForm.get(['professorChamada'])!.value,
    };
  }
}
