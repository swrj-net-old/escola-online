import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGrade, Grade } from 'app/shared/model/grade.model';
import { GradeService } from './grade.service';
import { ISerie } from 'app/shared/model/serie.model';
import { SerieService } from 'app/entities/serie/serie.service';
import { IMateria } from 'app/shared/model/materia.model';
import { MateriaService } from 'app/entities/materia/materia.service';
import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from 'app/entities/escola/escola.service';

type SelectableEntity = ISerie | IMateria | IEscola;

@Component({
  selector: 'jhi-grade-update',
  templateUrl: './grade-update.component.html',
})
export class GradeUpdateComponent implements OnInit {
  isSaving = false;
  series: ISerie[] = [];
  materias: IMateria[] = [];
  escolas: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    anoLetivo: [],
    serieGrade: [],
    materiaGrade: [],
    escolaGrade: [],
  });

  constructor(
    protected gradeService: GradeService,
    protected serieService: SerieService,
    protected materiaService: MateriaService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.updateForm(grade);

      this.serieService.query().subscribe((res: HttpResponse<ISerie[]>) => (this.series = res.body || []));

      this.materiaService.query().subscribe((res: HttpResponse<IMateria[]>) => (this.materias = res.body || []));

      this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
    });
  }

  updateForm(grade: IGrade): void {
    this.editForm.patchValue({
      id: grade.id,
      anoLetivo: grade.anoLetivo,
      serieGrade: grade.serieGrade,
      materiaGrade: grade.materiaGrade,
      escolaGrade: grade.escolaGrade,
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

  private createFromForm(): IGrade {
    return {
      ...new Grade(),
      id: this.editForm.get(['id'])!.value,
      anoLetivo: this.editForm.get(['anoLetivo'])!.value,
      serieGrade: this.editForm.get(['serieGrade'])!.value,
      materiaGrade: this.editForm.get(['materiaGrade'])!.value,
      escolaGrade: this.editForm.get(['escolaGrade'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
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
