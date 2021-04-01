import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoSolicitacao, TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';
import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from 'app/entities/escola/escola.service';

@Component({
  selector: 'jhi-tipo-solicitacao-update',
  templateUrl: './tipo-solicitacao-update.component.html',
})
export class TipoSolicitacaoUpdateComponent implements OnInit {
  isSaving = false;
  escolas: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    prazoAtendimento: [],
    valorEmissao: [],
    escolaTipoSolicitacao: [],
  });

  constructor(
    protected tipoSolicitacaoService: TipoSolicitacaoService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoSolicitacao }) => {
      this.updateForm(tipoSolicitacao);

      this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
    });
  }

  updateForm(tipoSolicitacao: ITipoSolicitacao): void {
    this.editForm.patchValue({
      id: tipoSolicitacao.id,
      nome: tipoSolicitacao.nome,
      prazoAtendimento: tipoSolicitacao.prazoAtendimento,
      valorEmissao: tipoSolicitacao.valorEmissao,
      escolaTipoSolicitacao: tipoSolicitacao.escolaTipoSolicitacao,
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

  private createFromForm(): ITipoSolicitacao {
    return {
      ...new TipoSolicitacao(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      prazoAtendimento: this.editForm.get(['prazoAtendimento'])!.value,
      valorEmissao: this.editForm.get(['valorEmissao'])!.value,
      escolaTipoSolicitacao: this.editForm.get(['escolaTipoSolicitacao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoSolicitacao>>): void {
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

  trackById(index: number, item: IEscola): any {
    return item.id;
  }
}
