import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEscola, Escola } from 'app/shared/model/escola.model';
import { EscolaService } from './escola.service';

@Component({
  selector: 'jhi-escola-update',
  templateUrl: './escola-update.component.html',
})
export class EscolaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    razaoSocial: [],
    cnpjPrincipal: [],
    url: [],
    prefixo: [],
    responsavelNome: [],
    responsavelCpf: [],
    responsavelEmail: [],
    responsavelCelular: [],
  });

  constructor(protected escolaService: EscolaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ escola }) => {
      this.updateForm(escola);
    });
  }

  updateForm(escola: IEscola): void {
    this.editForm.patchValue({
      id: escola.id,
      nome: escola.nome,
      razaoSocial: escola.razaoSocial,
      cnpjPrincipal: escola.cnpjPrincipal,
      url: escola.url,
      prefixo: escola.prefixo,
      responsavelNome: escola.responsavelNome,
      responsavelCpf: escola.responsavelCpf,
      responsavelEmail: escola.responsavelEmail,
      responsavelCelular: escola.responsavelCelular,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const escola = this.createFromForm();
    if (escola.id !== undefined) {
      this.subscribeToSaveResponse(this.escolaService.update(escola));
    } else {
      this.subscribeToSaveResponse(this.escolaService.create(escola));
    }
  }

  private createFromForm(): IEscola {
    return {
      ...new Escola(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      cnpjPrincipal: this.editForm.get(['cnpjPrincipal'])!.value,
      url: this.editForm.get(['url'])!.value,
      prefixo: this.editForm.get(['prefixo'])!.value,
      responsavelNome: this.editForm.get(['responsavelNome'])!.value,
      responsavelCpf: this.editForm.get(['responsavelCpf'])!.value,
      responsavelEmail: this.editForm.get(['responsavelEmail'])!.value,
      responsavelCelular: this.editForm.get(['responsavelCelular'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEscola>>): void {
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
}
