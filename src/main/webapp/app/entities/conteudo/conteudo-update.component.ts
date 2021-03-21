import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConteudo, Conteudo } from 'app/shared/model/conteudo.model';
import { ConteudoService } from './conteudo.service';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma/turma.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor/professor.service';
import { IMateria } from 'app/shared/model/materia.model';
import { MateriaService } from 'app/entities/materia/materia.service';

type SelectableEntity = ITurma | IProfessor | IMateria;

@Component({
  selector: 'jhi-conteudo-update',
  templateUrl: './conteudo-update.component.html',
})
export class ConteudoUpdateComponent implements OnInit {
  isSaving = false;
  turmas: ITurma[] = [];
  professors: IProfessor[] = [];
  materias: IMateria[] = [];
  dataAulaDp: any;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conteudo }) => {
      this.updateForm(conteudo);

      this.turmaService.query().subscribe((res: HttpResponse<ITurma[]>) => (this.turmas = res.body || []));

      this.professorService.query().subscribe((res: HttpResponse<IProfessor[]>) => (this.professors = res.body || []));

      this.materiaService.query().subscribe((res: HttpResponse<IMateria[]>) => (this.materias = res.body || []));
    });
  }

  updateForm(conteudo: IConteudo): void {
    this.editForm.patchValue({
      id: conteudo.id,
      dataAula: conteudo.dataAula,
      habilidadesCompetencias: conteudo.habilidadesCompetencias,
      observacoes: conteudo.observacoes,
      turmaConteudo: conteudo.turmaConteudo,
      professorConteudo: conteudo.professorConteudo,
      materiaConteudo: conteudo.materiaConteudo,
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

  private createFromForm(): IConteudo {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConteudo>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
