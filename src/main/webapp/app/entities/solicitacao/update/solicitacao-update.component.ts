import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISolicitacao, Solicitacao } from '../solicitacao.model';
import { SolicitacaoService } from '../service/solicitacao.service';
import { ITipoSolicitacao } from 'app/entities/tipo-solicitacao/tipo-solicitacao.model';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/service/tipo-solicitacao.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

@Component({
  selector: 'jhi-solicitacao-update',
  templateUrl: './solicitacao-update.component.html',
})
export class SolicitacaoUpdateComponent implements OnInit {
  isSaving = false;

  tipoSolicitacaosSharedCollection: ITipoSolicitacao[] = [];
  alunosSharedCollection: IAluno[] = [];

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
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitacao }) => {
      this.updateForm(solicitacao);

      this.loadRelationshipsOptions();
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

  trackTipoSolicitacaoById(index: number, item: ITipoSolicitacao): number {
    return item.id!;
  }

  trackAlunoById(index: number, item: IAluno): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitacao>>): void {
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

  protected updateForm(solicitacao: ISolicitacao): void {
    this.editForm.patchValue({
      id: solicitacao.id,
      situacaoSolicitacao: solicitacao.situacaoSolicitacao,
      dataSolicitacao: solicitacao.dataSolicitacao,
      observacoesSolicitante: solicitacao.observacoesSolicitante,
      observacoesAtendimento: solicitacao.observacoesAtendimento,
      tipoSolicitacaoSolicitacao: solicitacao.tipoSolicitacaoSolicitacao,
      alunoSolicitacao: solicitacao.alunoSolicitacao,
    });

    this.tipoSolicitacaosSharedCollection = this.tipoSolicitacaoService.addTipoSolicitacaoToCollectionIfMissing(
      this.tipoSolicitacaosSharedCollection,
      solicitacao.tipoSolicitacaoSolicitacao
    );
    this.alunosSharedCollection = this.alunoService.addAlunoToCollectionIfMissing(
      this.alunosSharedCollection,
      solicitacao.alunoSolicitacao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoSolicitacaoService
      .query()
      .pipe(map((res: HttpResponse<ITipoSolicitacao[]>) => res.body ?? []))
      .pipe(
        map((tipoSolicitacaos: ITipoSolicitacao[]) =>
          this.tipoSolicitacaoService.addTipoSolicitacaoToCollectionIfMissing(
            tipoSolicitacaos,
            this.editForm.get('tipoSolicitacaoSolicitacao')!.value
          )
        )
      )
      .subscribe((tipoSolicitacaos: ITipoSolicitacao[]) => (this.tipoSolicitacaosSharedCollection = tipoSolicitacaos));

    this.alunoService
      .query()
      .pipe(map((res: HttpResponse<IAluno[]>) => res.body ?? []))
      .pipe(
        map((alunos: IAluno[]) => this.alunoService.addAlunoToCollectionIfMissing(alunos, this.editForm.get('alunoSolicitacao')!.value))
      )
      .subscribe((alunos: IAluno[]) => (this.alunosSharedCollection = alunos));
  }

  protected createFromForm(): ISolicitacao {
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
}
