import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from 'app/entities/cidade/cidade.service';
import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from 'app/entities/escola/escola.service';

type SelectableEntity = ICidade | IEscola;

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  cidades: ICidade[] = [];
  escolas: IEscola[] = [];

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.cidadeService.query().subscribe((res: HttpResponse<ICidade[]>) => (this.cidades = res.body || []));

      this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
    });
  }

  updateForm(pessoa: IPessoa): void {
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

  private createFromForm(): IPessoa {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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
