import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';
import { DetalheUsuarioService } from '../service/detalhe-usuario.service';

@Component({
  selector: 'jhi-detalhe-usuario-update',
  templateUrl: './detalhe-usuario-update.component.html',
})
export class DetalheUsuarioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cpf: [],
    celular: [],
  });

  constructor(
    protected detalheUsuarioService: DetalheUsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalheUsuario }) => {
      this.updateForm(detalheUsuario);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detalheUsuario = this.createFromForm();
    if (detalheUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.detalheUsuarioService.update(detalheUsuario));
    } else {
      this.subscribeToSaveResponse(this.detalheUsuarioService.create(detalheUsuario));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalheUsuario>>): void {
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

  protected updateForm(detalheUsuario: IDetalheUsuario): void {
    this.editForm.patchValue({
      id: detalheUsuario.id,
      cpf: detalheUsuario.cpf,
      celular: detalheUsuario.celular,
    });
  }

  protected createFromForm(): IDetalheUsuario {
    return {
      ...new DetalheUsuario(),
      id: this.editForm.get(['id'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      celular: this.editForm.get(['celular'])!.value,
    };
  }
}
