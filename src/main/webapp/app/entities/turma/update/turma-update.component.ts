import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITurma, Turma } from '../turma.model';
import { TurmaService } from '../service/turma.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

@Component({
  selector: 'jhi-turma-update',
  templateUrl: './turma-update.component.html',
})
export class TurmaUpdateComponent implements OnInit {
  isSaving = false;

  seriesSharedCollection: ISerie[] = [];
  unidadesSharedCollection: IUnidade[] = [];

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
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ turma }) => {
      this.updateForm(turma);

      this.loadRelationshipsOptions();
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

  trackSerieById(index: number, item: ISerie): number {
    return item.id!;
  }

  trackUnidadeById(index: number, item: IUnidade): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurma>>): void {
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

  protected updateForm(turma: ITurma): void {
    this.editForm.patchValue({
      id: turma.id,
      nome: turma.nome,
      serieTurma: turma.serieTurma,
      unidadeTurma: turma.unidadeTurma,
    });

    this.seriesSharedCollection = this.serieService.addSerieToCollectionIfMissing(this.seriesSharedCollection, turma.serieTurma);
    this.unidadesSharedCollection = this.unidadeService.addUnidadeToCollectionIfMissing(this.unidadesSharedCollection, turma.unidadeTurma);
  }

  protected loadRelationshipsOptions(): void {
    this.serieService
      .query()
      .pipe(map((res: HttpResponse<ISerie[]>) => res.body ?? []))
      .pipe(map((series: ISerie[]) => this.serieService.addSerieToCollectionIfMissing(series, this.editForm.get('serieTurma')!.value)))
      .subscribe((series: ISerie[]) => (this.seriesSharedCollection = series));

    this.unidadeService
      .query()
      .pipe(map((res: HttpResponse<IUnidade[]>) => res.body ?? []))
      .pipe(
        map((unidades: IUnidade[]) =>
          this.unidadeService.addUnidadeToCollectionIfMissing(unidades, this.editForm.get('unidadeTurma')!.value)
        )
      )
      .subscribe((unidades: IUnidade[]) => (this.unidadesSharedCollection = unidades));
  }

  protected createFromForm(): ITurma {
    return {
      ...new Turma(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      serieTurma: this.editForm.get(['serieTurma'])!.value,
      unidadeTurma: this.editForm.get(['unidadeTurma'])!.value,
    };
  }
}
