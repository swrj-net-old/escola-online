import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IHistoricoDebito, HistoricoDebito } from '../historico-debito.model';
import { HistoricoDebitoService } from '../service/historico-debito.service';
import { IDebito } from 'app/entities/debito/debito.model';
import { DebitoService } from 'app/entities/debito/service/debito.service';
import { IDetalheUsuario } from 'app/entities/detalhe-usuario/detalhe-usuario.model';
import { DetalheUsuarioService } from 'app/entities/detalhe-usuario/service/detalhe-usuario.service';

@Component({
  selector: 'jhi-historico-debito-update',
  templateUrl: './historico-debito-update.component.html',
})
export class HistoricoDebitoUpdateComponent implements OnInit {
  isSaving = false;

  debitosSharedCollection: IDebito[] = [];
  detalheUsuariosSharedCollection: IDetalheUsuario[] = [];

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
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoDebito }) => {
      this.updateForm(historicoDebito);

      this.loadRelationshipsOptions();
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

  trackDebitoById(index: number, item: IDebito): number {
    return item.id!;
  }

  trackDetalheUsuarioById(index: number, item: IDetalheUsuario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoricoDebito>>): void {
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

  protected updateForm(historicoDebito: IHistoricoDebito): void {
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

    this.debitosSharedCollection = this.debitoService.addDebitoToCollectionIfMissing(
      this.debitosSharedCollection,
      historicoDebito.debitoHistoricoDebito
    );
    this.detalheUsuariosSharedCollection = this.detalheUsuarioService.addDetalheUsuarioToCollectionIfMissing(
      this.detalheUsuariosSharedCollection,
      historicoDebito.detalheUsuarioLancamento
    );
  }

  protected loadRelationshipsOptions(): void {
    this.debitoService
      .query()
      .pipe(map((res: HttpResponse<IDebito[]>) => res.body ?? []))
      .pipe(
        map((debitos: IDebito[]) =>
          this.debitoService.addDebitoToCollectionIfMissing(debitos, this.editForm.get('debitoHistoricoDebito')!.value)
        )
      )
      .subscribe((debitos: IDebito[]) => (this.debitosSharedCollection = debitos));

    this.detalheUsuarioService
      .query()
      .pipe(map((res: HttpResponse<IDetalheUsuario[]>) => res.body ?? []))
      .pipe(
        map((detalheUsuarios: IDetalheUsuario[]) =>
          this.detalheUsuarioService.addDetalheUsuarioToCollectionIfMissing(
            detalheUsuarios,
            this.editForm.get('detalheUsuarioLancamento')!.value
          )
        )
      )
      .subscribe((detalheUsuarios: IDetalheUsuario[]) => (this.detalheUsuariosSharedCollection = detalheUsuarios));
  }

  protected createFromForm(): IHistoricoDebito {
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
}
