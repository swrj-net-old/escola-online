import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUnidade, Unidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from './unidade.service';
import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from 'app/entities/escola/escola.service';

@Component({
  selector: 'jhi-unidade-update',
  templateUrl: './unidade-update.component.html',
})
export class UnidadeUpdateComponent implements OnInit {
  isSaving = false;
  escolas: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    escolaUnidade: [],
  });

  constructor(
    protected unidadeService: UnidadeService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidade }) => {
      this.updateForm(unidade);

      this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
    });
  }

  updateForm(unidade: IUnidade): void {
    this.editForm.patchValue({
      id: unidade.id,
      nome: unidade.nome,
      escolaUnidade: unidade.escolaUnidade,
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

  private createFromForm(): IUnidade {
    return {
      ...new Unidade(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      escolaUnidade: this.editForm.get(['escolaUnidade'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnidade>>): void {
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

  trackById(index: number, item: IEscola): any {
    return item.id;
  }
}
