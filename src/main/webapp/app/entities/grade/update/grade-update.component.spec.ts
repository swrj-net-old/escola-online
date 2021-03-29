jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { GradeService } from '../service/grade.service';
import { IGrade, Grade } from '../grade.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IMateria } from 'app/entities/materia/materia.model';
import { MateriaService } from 'app/entities/materia/service/materia.service';

import { GradeUpdateComponent } from './grade-update.component';

describe('Component Tests', () => {
  describe('Grade Management Update Component', () => {
    let comp: GradeUpdateComponent;
    let fixture: ComponentFixture<GradeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let gradeService: GradeService;
    let serieService: SerieService;
    let materiaService: MateriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [GradeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(GradeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GradeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      gradeService = TestBed.inject(GradeService);
      serieService = TestBed.inject(SerieService);
      materiaService = TestBed.inject(MateriaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Serie query and add missing value', () => {
        const grade: IGrade = { id: 456 };
        const serieGrade: ISerie = { id: 25564 };
        grade.serieGrade = serieGrade;

        const serieCollection: ISerie[] = [{ id: 93791 }];
        spyOn(serieService, 'query').and.returnValue(of(new HttpResponse({ body: serieCollection })));
        const additionalSeries = [serieGrade];
        const expectedCollection: ISerie[] = [...additionalSeries, ...serieCollection];
        spyOn(serieService, 'addSerieToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, ...additionalSeries);
        expect(comp.seriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Materia query and add missing value', () => {
        const grade: IGrade = { id: 456 };
        const materiaGrade: IMateria = { id: 77753 };
        grade.materiaGrade = materiaGrade;

        const materiaCollection: IMateria[] = [{ id: 22998 }];
        spyOn(materiaService, 'query').and.returnValue(of(new HttpResponse({ body: materiaCollection })));
        const additionalMaterias = [materiaGrade];
        const expectedCollection: IMateria[] = [...additionalMaterias, ...materiaCollection];
        spyOn(materiaService, 'addMateriaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        expect(materiaService.query).toHaveBeenCalled();
        expect(materiaService.addMateriaToCollectionIfMissing).toHaveBeenCalledWith(materiaCollection, ...additionalMaterias);
        expect(comp.materiasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const grade: IGrade = { id: 456 };
        const serieGrade: ISerie = { id: 73128 };
        grade.serieGrade = serieGrade;
        const materiaGrade: IMateria = { id: 16009 };
        grade.materiaGrade = materiaGrade;

        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(grade));
        expect(comp.seriesSharedCollection).toContain(serieGrade);
        expect(comp.materiasSharedCollection).toContain(materiaGrade);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const grade = { id: 123 };
        spyOn(gradeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: grade }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(gradeService.update).toHaveBeenCalledWith(grade);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const grade = new Grade();
        spyOn(gradeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: grade }));
        saveSubject.complete();

        // THEN
        expect(gradeService.create).toHaveBeenCalledWith(grade);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const grade = { id: 123 };
        spyOn(gradeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ grade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(gradeService.update).toHaveBeenCalledWith(grade);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackSerieById', () => {
        it('Should return tracked Serie primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSerieById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMateriaById', () => {
        it('Should return tracked Materia primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMateriaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
