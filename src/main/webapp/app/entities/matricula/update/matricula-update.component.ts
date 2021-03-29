import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMatricula, Matricula } from '../matricula.model';
import { MatriculaService } from '../service/matricula.service';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

@Component({
  selector: 'jhi-matricula-update',
  templateUrl: './matricula-update.component.html',
})
export class MatriculaUpdateComponent implements OnInit {
  isSaving = false;

  turmasSharedCollection: ITurma[] = [];
  alunosSharedCollection: IAluno[] = [];

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
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matricula }) => {
      this.updateForm(matricula);

      this.loadRelationshipsOptions();
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

  trackTurmaById(index: number, item: ITurma): number {
    return item.id!;
  }

  trackAlunoById(index: number, item: IAluno): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatricula>>): void {
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

  protected updateForm(matricula: IMatricula): void {
    this.editForm.patchValue({
      id: matricula.id,
      anoLetivo: matricula.anoLetivo,
      dataInicio: matricula.dataInicio,
      dataFim: matricula.dataFim,
      turmaMatricula: matricula.turmaMatricula,
      alunoMatricula: matricula.alunoMatricula,
    });

    this.turmasSharedCollection = this.turmaService.addTurmaToCollectionIfMissing(this.turmasSharedCollection, matricula.turmaMatricula);
    this.alunosSharedCollection = this.alunoService.addAlunoToCollectionIfMissing(this.alunosSharedCollection, matricula.alunoMatricula);
  }

  protected loadRelationshipsOptions(): void {
    this.turmaService
      .query()
      .pipe(map((res: HttpResponse<ITurma[]>) => res.body ?? []))
      .pipe(map((turmas: ITurma[]) => this.turmaService.addTurmaToCollectionIfMissing(turmas, this.editForm.get('turmaMatricula')!.value)))
      .subscribe((turmas: ITurma[]) => (this.turmasSharedCollection = turmas));

    this.alunoService
      .query()
      .pipe(map((res: HttpResponse<IAluno[]>) => res.body ?? []))
      .pipe(map((alunos: IAluno[]) => this.alunoService.addAlunoToCollectionIfMissing(alunos, this.editForm.get('alunoMatricula')!.value)))
      .subscribe((alunos: IAluno[]) => (this.alunosSharedCollection = alunos));
  }

  protected createFromForm(): IMatricula {
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
}
