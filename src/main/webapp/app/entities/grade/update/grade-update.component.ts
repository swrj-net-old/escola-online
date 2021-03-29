import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IGrade, Grade } from '../grade.model';
import { GradeService } from '../service/grade.service';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IMateria } from 'app/entities/materia/materia.model';
import { MateriaService } from 'app/entities/materia/service/materia.service';

@Component({
  selector: 'jhi-grade-update',
  templateUrl: './grade-update.component.html',
})
export class GradeUpdateComponent implements OnInit {
  isSaving = false;

  seriesSharedCollection: ISerie[] = [];
  materiasSharedCollection: IMateria[] = [];

  editForm = this.fb.group({
    id: [],
    anoLetivo: [],
    serieGrade: [],
    materiaGrade: [],
  });

  constructor(
    protected gradeService: GradeService,
    protected serieService: SerieService,
    protected materiaService: MateriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.updateForm(grade);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grade = this.createFromForm();
    if (grade.id !== undefined) {
      this.subscribeToSaveResponse(this.gradeService.update(grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(grade));
    }
  }

  trackSerieById(index: number, item: ISerie): number {
    return item.id!;
  }

  trackMateriaById(index: number, item: IMateria): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
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

  protected updateForm(grade: IGrade): void {
    this.editForm.patchValue({
      id: grade.id,
      anoLetivo: grade.anoLetivo,
      serieGrade: grade.serieGrade,
      materiaGrade: grade.materiaGrade,
    });

    this.seriesSharedCollection = this.serieService.addSerieToCollectionIfMissing(this.seriesSharedCollection, grade.serieGrade);
    this.materiasSharedCollection = this.materiaService.addMateriaToCollectionIfMissing(this.materiasSharedCollection, grade.materiaGrade);
  }

  protected loadRelationshipsOptions(): void {
    this.serieService
      .query()
      .pipe(map((res: HttpResponse<ISerie[]>) => res.body ?? []))
      .pipe(map((series: ISerie[]) => this.serieService.addSerieToCollectionIfMissing(series, this.editForm.get('serieGrade')!.value)))
      .subscribe((series: ISerie[]) => (this.seriesSharedCollection = series));

    this.materiaService
      .query()
      .pipe(map((res: HttpResponse<IMateria[]>) => res.body ?? []))
      .pipe(
        map((materias: IMateria[]) =>
          this.materiaService.addMateriaToCollectionIfMissing(materias, this.editForm.get('materiaGrade')!.value)
        )
      )
      .subscribe((materias: IMateria[]) => (this.materiasSharedCollection = materias));
  }

  protected createFromForm(): IGrade {
    return {
      ...new Grade(),
      id: this.editForm.get(['id'])!.value,
      anoLetivo: this.editForm.get(['anoLetivo'])!.value,
      serieGrade: this.editForm.get(['serieGrade'])!.value,
      materiaGrade: this.editForm.get(['materiaGrade'])!.value,
    };
  }
}
