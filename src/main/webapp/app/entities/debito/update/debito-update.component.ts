import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDebito, Debito } from '../debito.model';
import { DebitoService } from '../service/debito.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

@Component({
  selector: 'jhi-debito-update',
  templateUrl: './debito-update.component.html',
})
export class DebitoUpdateComponent implements OnInit {
  isSaving = false;

  alunosSharedCollection: IAluno[] = [];

  editForm = this.fb.group({
    id: [],
    tipoDebito: [],
    situacaoDebito: [],
    dataVencimento: [],
    dataPagamento: [],
    valorOriginal: [],
    totalPago: [],
    totalDesconto: [],
    totalDevido: [],
    observacoes: [],
    alunoDebito: [],
  });

  constructor(
    protected debitoService: DebitoService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ debito }) => {
      this.updateForm(debito);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const debito = this.createFromForm();
    if (debito.id !== undefined) {
      this.subscribeToSaveResponse(this.debitoService.update(debito));
    } else {
      this.subscribeToSaveResponse(this.debitoService.create(debito));
    }
  }

  trackAlunoById(index: number, item: IAluno): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDebito>>): void {
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

  protected updateForm(debito: IDebito): void {
    this.editForm.patchValue({
      id: debito.id,
      tipoDebito: debito.tipoDebito,
      situacaoDebito: debito.situacaoDebito,
      dataVencimento: debito.dataVencimento,
      dataPagamento: debito.dataPagamento,
      valorOriginal: debito.valorOriginal,
      totalPago: debito.totalPago,
      totalDesconto: debito.totalDesconto,
      totalDevido: debito.totalDevido,
      observacoes: debito.observacoes,
      alunoDebito: debito.alunoDebito,
    });

    this.alunosSharedCollection = this.alunoService.addAlunoToCollectionIfMissing(this.alunosSharedCollection, debito.alunoDebito);
  }

  protected loadRelationshipsOptions(): void {
    this.alunoService
      .query()
      .pipe(map((res: HttpResponse<IAluno[]>) => res.body ?? []))
      .pipe(map((alunos: IAluno[]) => this.alunoService.addAlunoToCollectionIfMissing(alunos, this.editForm.get('alunoDebito')!.value)))
      .subscribe((alunos: IAluno[]) => (this.alunosSharedCollection = alunos));
  }

  protected createFromForm(): IDebito {
    return {
      ...new Debito(),
      id: this.editForm.get(['id'])!.value,
      tipoDebito: this.editForm.get(['tipoDebito'])!.value,
      situacaoDebito: this.editForm.get(['situacaoDebito'])!.value,
      dataVencimento: this.editForm.get(['dataVencimento'])!.value,
      dataPagamento: this.editForm.get(['dataPagamento'])!.value,
      valorOriginal: this.editForm.get(['valorOriginal'])!.value,
      totalPago: this.editForm.get(['totalPago'])!.value,
      totalDesconto: this.editForm.get(['totalDesconto'])!.value,
      totalDevido: this.editForm.get(['totalDevido'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      alunoDebito: this.editForm.get(['alunoDebito'])!.value,
    };
  }
}
