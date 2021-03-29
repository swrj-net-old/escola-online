import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMateria, Materia } from 'app/shared/model/materia.model';
import { MateriaService } from './materia.service';

@Component({
  selector: 'jhi-materia-update',
  templateUrl: './materia-update.component.html',
})
export class MateriaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    sigla: [],
  });

  constructor(protected materiaService: MateriaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materia }) => {
      this.updateForm(materia);
    });
  }

  updateForm(materia: IMateria): void {
    this.editForm.patchValue({
      id: materia.id,
      nome: materia.nome,
      sigla: materia.sigla,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materia = this.createFromForm();
    if (materia.id !== undefined) {
      this.subscribeToSaveResponse(this.materiaService.update(materia));
    } else {
      this.subscribeToSaveResponse(this.materiaService.create(materia));
    }
  }

  private createFromForm(): IMateria {
    return {
      ...new Materia(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sigla: this.editForm.get(['sigla'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMateria>>): void {
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
