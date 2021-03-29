import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IUnidade, Unidade } from '../unidade.model';
import { UnidadeService } from '../service/unidade.service';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

@Component({
  selector: 'jhi-unidade-update',
  templateUrl: './unidade-update.component.html',
})
export class UnidadeUpdateComponent implements OnInit {
  isSaving = false;

  escolasSharedCollection: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    cnpj: [],
    endereco: [],
    complemento: [],
    bairro: [],
    cidade: [],
    cep: [],
    telefoneComercial: [],
    telefoneWhatsapp: [],
    email: [],
    facebook: [],
    observacoes: [],
    escolaUnidade: [],
  });

  constructor(
    protected unidadeService: UnidadeService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidade }) => {
      this.updateForm(unidade);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unidade = this.createFromForm();
    if (unidade.id !== undefined) {
      this.subscribeToSaveResponse(this.unidadeService.update(unidade));
    } else {
      this.subscribeToSaveResponse(this.unidadeService.create(unidade));
    }
  }

  trackEscolaById(index: number, item: IEscola): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnidade>>): void {
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

  protected updateForm(unidade: IUnidade): void {
    this.editForm.patchValue({
      id: unidade.id,
      nome: unidade.nome,
      cnpj: unidade.cnpj,
      endereco: unidade.endereco,
      complemento: unidade.complemento,
      bairro: unidade.bairro,
      cidade: unidade.cidade,
      cep: unidade.cep,
      telefoneComercial: unidade.telefoneComercial,
      telefoneWhatsapp: unidade.telefoneWhatsapp,
      email: unidade.email,
      facebook: unidade.facebook,
      observacoes: unidade.observacoes,
      escolaUnidade: unidade.escolaUnidade,
    });

    this.escolasSharedCollection = this.escolaService.addEscolaToCollectionIfMissing(this.escolasSharedCollection, unidade.escolaUnidade);
  }

  protected loadRelationshipsOptions(): void {
    this.escolaService
      .query()
      .pipe(map((res: HttpResponse<IEscola[]>) => res.body ?? []))
      .pipe(
        map((escolas: IEscola[]) => this.escolaService.addEscolaToCollectionIfMissing(escolas, this.editForm.get('escolaUnidade')!.value))
      )
      .subscribe((escolas: IEscola[]) => (this.escolasSharedCollection = escolas));
  }

  protected createFromForm(): IUnidade {
    return {
      ...new Unidade(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cnpj: this.editForm.get(['cnpj'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      complemento: this.editForm.get(['complemento'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
      cep: this.editForm.get(['cep'])!.value,
      telefoneComercial: this.editForm.get(['telefoneComercial'])!.value,
      telefoneWhatsapp: this.editForm.get(['telefoneWhatsapp'])!.value,
      email: this.editForm.get(['email'])!.value,
      facebook: this.editForm.get(['facebook'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      escolaUnidade: this.editForm.get(['escolaUnidade'])!.value,
    };
  }
}
