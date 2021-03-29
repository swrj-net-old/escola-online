import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoSolicitacao, TipoSolicitacao } from '../tipo-solicitacao.model';
import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';

@Component({
  selector: 'jhi-tipo-solicitacao-update',
  templateUrl: './tipo-solicitacao-update.component.html',
})
export class TipoSolicitacaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    prazoAtendimento: [],
    valorEmissao: [],
  });

  constructor(
    protected tipoSolicitacaoService: TipoSolicitacaoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoSolicitacao }) => {
      this.updateForm(tipoSolicitacao);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoSolicitacao = this.createFromForm();
    if (tipoSolicitacao.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoSolicitacaoService.update(tipoSolicitacao));
    } else {
      this.subscribeToSaveResponse(this.tipoSolicitacaoService.create(tipoSolicitacao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoSolicitacao>>): void {
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

  protected updateForm(tipoSolicitacao: ITipoSolicitacao): void {
    this.editForm.patchValue({
      id: tipoSolicitacao.id,
      nome: tipoSolicitacao.nome,
      prazoAtendimento: tipoSolicitacao.prazoAtendimento,
      valorEmissao: tipoSolicitacao.valorEmissao,
    });
  }

  protected createFromForm(): ITipoSolicitacao {
    return {
      ...new TipoSolicitacao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      prazoAtendimento: this.editForm.get(['prazoAtendimento'])!.value,
      valorEmissao: this.editForm.get(['valorEmissao'])!.value,
    };
  }
}
