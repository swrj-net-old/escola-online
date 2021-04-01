import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMatricula, Matricula } from 'app/shared/model/matricula.model';
import { MatriculaService } from './matricula.service';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma/turma.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';

type SelectableEntity = ITurma | IAluno;

@Component({
  selector: 'jhi-matricula-update',
  templateUrl: './matricula-update.component.html',
})
export class MatriculaUpdateComponent implements OnInit {
  isSaving = false;
  turmas: ITurma[] = [];
  alunos: IAluno[] = [];
  dataInicioDp: any;
  dataFimDp: any;

  editForm = this.fb.group({
    id: [],
    anoLetivo: [],
    dataInicio: [],
    dataFim: [],
    turmaMatricula: [],
    alunoMatricula: [],
  });

  constructor(
    protected matriculaService: MatriculaService,
    protected turmaService: TurmaService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matricula }) => {
      this.updateForm(matricula);

      this.turmaService.query().subscribe((res: HttpResponse<ITurma[]>) => (this.turmas = res.body || []));

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
    });
  }

  updateForm(matricula: IMatricula): void {
    this.editForm.patchValue({
      id: matricula.id,
      anoLetivo: matricula.anoLetivo,
      dataInicio: matricula.dataInicio,
      dataFim: matricula.dataFim,
      turmaMatricula: matricula.turmaMatricula,
      alunoMatricula: matricula.alunoMatricula,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const matricula = this.createFromForm();
    if (matricula.id !== undefined) {
      this.subscribeToSaveResponse(this.matriculaService.update(matricula));
    } else {
      this.subscribeToSaveResponse(this.matriculaService.create(matricula));
    }
  }

  private createFromForm(): IMatricula {
    return {
      ...new Matricula(),
      id: this.editForm.get(['id'])!.value,
      anoLetivo: this.editForm.get(['anoLetivo'])!.value,
      dataInicio: this.editForm.get(['dataInicio'])!.value,
      dataFim: this.editForm.get(['dataFim'])!.value,
      turmaMatricula: this.editForm.get(['turmaMatricula'])!.value,
      alunoMatricula: this.editForm.get(['alunoMatricula'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatricula>>): void {
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
