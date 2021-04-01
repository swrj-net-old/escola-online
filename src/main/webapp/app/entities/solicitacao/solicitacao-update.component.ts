import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISolicitacao, Solicitacao } from 'app/shared/model/solicitacao.model';
import { SolicitacaoService } from './solicitacao.service';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/tipo-solicitacao.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';

type SelectableEntity = ITipoSolicitacao | IAluno;

@Component({
  selector: 'jhi-solicitacao-update',
  templateUrl: './solicitacao-update.component.html',
})
export class SolicitacaoUpdateComponent implements OnInit {
  isSaving = false;
  tiposolicitacaos: ITipoSolicitacao[] = [];
  alunos: IAluno[] = [];
  dataSolicitacaoDp: any;

  editForm = this.fb.group({
    id: [],
    situacaoSolicitacao: [],
    dataSolicitacao: [],
    observacoesSolicitante: [],
    observacoesAtendimento: [],
    tipoSolicitacaoSolicitacao: [],
    alunoSolicitacao: [],
  });

  constructor(
    protected solicitacaoService: SolicitacaoService,
    protected tipoSolicitacaoService: TipoSolicitacaoService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitacao }) => {
      this.updateForm(solicitacao);

      this.tipoSolicitacaoService.query().subscribe((res: HttpResponse<ITipoSolicitacao[]>) => (this.tiposolicitacaos = res.body || []));

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
    });
  }

  updateForm(solicitacao: ISolicitacao): void {
    this.editForm.patchValue({
      id: solicitacao.id,
      situacaoSolicitacao: solicitacao.situacaoSolicitacao,
      dataSolicitacao: solicitacao.dataSolicitacao,
      observacoesSolicitante: solicitacao.observacoesSolicitante,
      observacoesAtendimento: solicitacao.observacoesAtendimento,
      tipoSolicitacaoSolicitacao: solicitacao.tipoSolicitacaoSolicitacao,
      alunoSolicitacao: solicitacao.alunoSolicitacao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const solicitacao = this.createFromForm();
    if (solicitacao.id !== undefined) {
      this.subscribeToSaveResponse(this.solicitacaoService.update(solicitacao));
    } else {
      this.subscribeToSaveResponse(this.solicitacaoService.create(solicitacao));
    }
  }

  private createFromForm(): ISolicitacao {
    return {
      ...new Solicitacao(),
      id: this.editForm.get(['id'])!.value,
      situacaoSolicitacao: this.editForm.get(['situacaoSolicitacao'])!.value,
      dataSolicitacao: this.editForm.get(['dataSolicitacao'])!.value,
      observacoesSolicitante: this.editForm.get(['observacoesSolicitante'])!.value,
      observacoesAtendimento: this.editForm.get(['observacoesAtendimento'])!.value,
      tipoSolicitacaoSolicitacao: this.editForm.get(['tipoSolicitacaoSolicitacao'])!.value,
      alunoSolicitacao: this.editForm.get(['alunoSolicitacao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitacao>>): void {
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
