import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDebito, Debito } from 'app/shared/model/debito.model';
import { DebitoService } from './debito.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';

@Component({
  selector: 'jhi-debito-update',
  templateUrl: './debito-update.component.html',
})
export class DebitoUpdateComponent implements OnInit {
  isSaving = false;
  alunos: IAluno[] = [];
  dataVencimentoDp: any;
  dataPagamentoDp: any;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ debito }) => {
      this.updateForm(debito);

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
    });
  }

  updateForm(debito: IDebito): void {
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

  private createFromForm(): IDebito {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDebito>>): void {
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

  trackById(index: number, item: IAluno): any {
    return item.id;
  }
}
