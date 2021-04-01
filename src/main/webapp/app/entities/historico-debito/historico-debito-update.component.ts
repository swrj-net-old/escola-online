import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoricoDebito, HistoricoDebito } from 'app/shared/model/historico-debito.model';
import { HistoricoDebitoService } from './historico-debito.service';
import { IDebito } from 'app/shared/model/debito.model';
import { DebitoService } from 'app/entities/debito/debito.service';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { DetalheUsuarioService } from 'app/entities/detalhe-usuario/detalhe-usuario.service';

type SelectableEntity = IDebito | IDetalheUsuario;

@Component({
  selector: 'jhi-historico-debito-update',
  templateUrl: './historico-debito-update.component.html',
})
export class HistoricoDebitoUpdateComponent implements OnInit {
  isSaving = false;
  debitos: IDebito[] = [];
  detalheusuarios: IDetalheUsuario[] = [];
  dataLancamentoDp: any;
  dataVencimentoDp: any;
  dataPagamentoDp: any;

  editForm = this.fb.group({
    id: [],
    dataLancamento: [],
    situacaoDebito: [],
    dataVencimento: [],
    dataPagamento: [],
    valorOriginal: [],
    totalPago: [],
    totalDesconto: [],
    totalDevido: [],
    observacoes: [],
    debitoHistoricoDebito: [],
    detalheUsuarioLancamento: [],
  });

  constructor(
    protected historicoDebitoService: HistoricoDebitoService,
    protected debitoService: DebitoService,
    protected detalheUsuarioService: DetalheUsuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoDebito }) => {
      this.updateForm(historicoDebito);

      this.debitoService.query().subscribe((res: HttpResponse<IDebito[]>) => (this.debitos = res.body || []));

      this.detalheUsuarioService.query().subscribe((res: HttpResponse<IDetalheUsuario[]>) => (this.detalheusuarios = res.body || []));
    });
  }

  updateForm(historicoDebito: IHistoricoDebito): void {
    this.editForm.patchValue({
      id: historicoDebito.id,
      dataLancamento: historicoDebito.dataLancamento,
      situacaoDebito: historicoDebito.situacaoDebito,
      dataVencimento: historicoDebito.dataVencimento,
      dataPagamento: historicoDebito.dataPagamento,
      valorOriginal: historicoDebito.valorOriginal,
      totalPago: historicoDebito.totalPago,
      totalDesconto: historicoDebito.totalDesconto,
      totalDevido: historicoDebito.totalDevido,
      observacoes: historicoDebito.observacoes,
      debitoHistoricoDebito: historicoDebito.debitoHistoricoDebito,
      detalheUsuarioLancamento: historicoDebito.detalheUsuarioLancamento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historicoDebito = this.createFromForm();
    if (historicoDebito.id !== undefined) {
      this.subscribeToSaveResponse(this.historicoDebitoService.update(historicoDebito));
    } else {
      this.subscribeToSaveResponse(this.historicoDebitoService.create(historicoDebito));
    }
  }

  private createFromForm(): IHistoricoDebito {
    return {
      ...new HistoricoDebito(),
      id: this.editForm.get(['id'])!.value,
      dataLancamento: this.editForm.get(['dataLancamento'])!.value,
      situacaoDebito: this.editForm.get(['situacaoDebito'])!.value,
      dataVencimento: this.editForm.get(['dataVencimento'])!.value,
      dataPagamento: this.editForm.get(['dataPagamento'])!.value,
      valorOriginal: this.editForm.get(['valorOriginal'])!.value,
      totalPago: this.editForm.get(['totalPago'])!.value,
      totalDesconto: this.editForm.get(['totalDesconto'])!.value,
      totalDevido: this.editForm.get(['totalDevido'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      debitoHistoricoDebito: this.editForm.get(['debitoHistoricoDebito'])!.value,
      detalheUsuarioLancamento: this.editForm.get(['detalheUsuarioLancamento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoricoDebito>>): void {
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
