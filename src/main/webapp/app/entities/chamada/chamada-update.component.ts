import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChamada, Chamada } from 'app/shared/model/chamada.model';
import { ChamadaService } from './chamada.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma/turma.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor/professor.service';

type SelectableEntity = IAluno | ITurma | IProfessor;

@Component({
  selector: 'jhi-chamada-update',
  templateUrl: './chamada-update.component.html',
})
export class ChamadaUpdateComponent implements OnInit {
  isSaving = false;
  alunos: IAluno[] = [];
  turmas: ITurma[] = [];
  professors: IProfessor[] = [];
  dataAulaDp: any;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chamada }) => {
      this.updateForm(chamada);

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));

      this.turmaService.query().subscribe((res: HttpResponse<ITurma[]>) => (this.turmas = res.body || []));

      this.professorService.query().subscribe((res: HttpResponse<IProfessor[]>) => (this.professors = res.body || []));
    });
  }

  updateForm(chamada: IChamada): void {
    this.editForm.patchValue({
      id: chamada.id,
      dataAula: chamada.dataAula,
      observacoes: chamada.observacoes,
      alunoChamada: chamada.alunoChamada,
      turmaChamada: chamada.turmaChamada,
      professorChamada: chamada.professorChamada,
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

  private createFromForm(): IChamada {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChamada>>): void {
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
