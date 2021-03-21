import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITurma, Turma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';
import { ISerie } from 'app/shared/model/serie.model';
import { SerieService } from 'app/entities/serie/serie.service';
import { IUnidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from 'app/entities/unidade/unidade.service';

type SelectableEntity = ISerie | IUnidade;

@Component({
  selector: 'jhi-turma-update',
  templateUrl: './turma-update.component.html',
})
export class TurmaUpdateComponent implements OnInit {
  isSaving = false;
  series: ISerie[] = [];
  unidades: IUnidade[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    serieTurma: [],
    unidadeTurma: [],
  });

  constructor(
    protected turmaService: TurmaService,
    protected serieService: SerieService,
    protected unidadeService: UnidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turma }) => {
      this.updateForm(turma);

      this.serieService.query().subscribe((res: HttpResponse<ISerie[]>) => (this.series = res.body || []));

      this.unidadeService.query().subscribe((res: HttpResponse<IUnidade[]>) => (this.unidades = res.body || []));
    });
  }

  updateForm(turma: ITurma): void {
    this.editForm.patchValue({
      id: turma.id,
      nome: turma.nome,
      serieTurma: turma.serieTurma,
      unidadeTurma: turma.unidadeTurma,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const turma = this.createFromForm();
    if (turma.id !== undefined) {
      this.subscribeToSaveResponse(this.turmaService.update(turma));
    } else {
      this.subscribeToSaveResponse(this.turmaService.create(turma));
    }
  }

  private createFromForm(): ITurma {
    return {
      ...new Turma(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      serieTurma: this.editForm.get(['serieTurma'])!.value,
      unidadeTurma: this.editForm.get(['unidadeTurma'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurma>>): void {
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
