import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPessoa, Pessoa } from '../pessoa.model';
import { PessoaService } from '../service/pessoa.service';
import { ICidade } from 'app/entities/cidade/cidade.model';
import { CidadeService } from 'app/entities/cidade/service/cidade.service';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;

  cidadesSharedCollection: ICidade[] = [];
  escolasSharedCollection: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    cpf: [],
    rg: [],
    endereco: [],
    complemento: [],
    bairro: [],
    cidade: [],
    cep: [],
    telefoneCelular: [],
    telefoneResidencial: [],
    telefoneComercial: [],
    email: [],
    observacoes: [],
    cidadePessoa: [],
    escolaPessoa: [],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected cidadeService: CidadeService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  trackCidadeById(index: number, item: ICidade): number {
    return item.id!;
  }

  trackEscolaById(index: number, item: IEscola): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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

  protected updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      rg: pessoa.rg,
      endereco: pessoa.endereco,
      complemento: pessoa.complemento,
      bairro: pessoa.bairro,
      cidade: pessoa.cidade,
      cep: pessoa.cep,
      telefoneCelular: pessoa.telefoneCelular,
      telefoneResidencial: pessoa.telefoneResidencial,
      telefoneComercial: pessoa.telefoneComercial,
      email: pessoa.email,
      observacoes: pessoa.observacoes,
      cidadePessoa: pessoa.cidadePessoa,
      escolaPessoa: pessoa.escolaPessoa,
    });

    this.cidadesSharedCollection = this.cidadeService.addCidadeToCollectionIfMissing(this.cidadesSharedCollection, pessoa.cidadePessoa);
    this.escolasSharedCollection = this.escolaService.addEscolaToCollectionIfMissing(this.escolasSharedCollection, pessoa.escolaPessoa);
  }

  protected loadRelationshipsOptions(): void {
    this.cidadeService
      .query()
      .pipe(map((res: HttpResponse<ICidade[]>) => res.body ?? []))
      .pipe(
        map((cidades: ICidade[]) => this.cidadeService.addCidadeToCollectionIfMissing(cidades, this.editForm.get('cidadePessoa')!.value))
      )
      .subscribe((cidades: ICidade[]) => (this.cidadesSharedCollection = cidades));

    this.escolaService
      .query()
      .pipe(map((res: HttpResponse<IEscola[]>) => res.body ?? []))
      .pipe(
        map((escolas: IEscola[]) => this.escolaService.addEscolaToCollectionIfMissing(escolas, this.editForm.get('escolaPessoa')!.value))
      )
      .subscribe((escolas: IEscola[]) => (this.escolasSharedCollection = escolas));
  }

  protected createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      rg: this.editForm.get(['rg'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      complemento: this.editForm.get(['complemento'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
      cep: this.editForm.get(['cep'])!.value,
      telefoneCelular: this.editForm.get(['telefoneCelular'])!.value,
      telefoneResidencial: this.editForm.get(['telefoneResidencial'])!.value,
      telefoneComercial: this.editForm.get(['telefoneComercial'])!.value,
      email: this.editForm.get(['email'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      cidadePessoa: this.editForm.get(['cidadePessoa'])!.value,
      escolaPessoa: this.editForm.get(['escolaPessoa'])!.value,
    };
  }
}
