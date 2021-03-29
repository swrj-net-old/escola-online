import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';
import { DetalheUsuarioService } from '../service/detalhe-usuario.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-detalhe-usuario-update',
  templateUrl: './detalhe-usuario-update.component.html',
})
export class DetalheUsuarioUpdateComponent implements OnInit {
  isSaving = false;

  usersSharedCollection: IUser[] = [];

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
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalheUsuario }) => {
      this.updateForm(detalheUsuario);

      this.loadRelationshipsOptions();
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

  trackUserById(index: number, item: IUser): number {
    return item.id!;
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
      usuario: detalheUsuario.usuario,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, detalheUsuario.usuario);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('usuario')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IDetalheUsuario {
    return {
      ...new DetalheUsuario(),
      id: this.editForm.get(['id'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      celular: this.editForm.get(['celular'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
