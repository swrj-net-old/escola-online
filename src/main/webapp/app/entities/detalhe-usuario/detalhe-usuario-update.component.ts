import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDetalheUsuario, DetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { DetalheUsuarioService } from './detalhe-usuario.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-detalhe-usuario-update',
  templateUrl: './detalhe-usuario-update.component.html',
})
export class DetalheUsuarioUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    cpf: [],
    celular: [],
    usuario: [],
  });

  constructor(
    protected detalheUsuarioService: DetalheUsuarioService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalheUsuario }) => {
      this.updateForm(detalheUsuario);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(detalheUsuario: IDetalheUsuario): void {
    this.editForm.patchValue({
      id: detalheUsuario.id,
      cpf: detalheUsuario.cpf,
      celular: detalheUsuario.celular,
      usuario: detalheUsuario.usuario,
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

  private createFromForm(): IDetalheUsuario {
    return {
      ...new DetalheUsuario(),
      id: this.editForm.get(['id'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      celular: this.editForm.get(['celular'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalheUsuario>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
