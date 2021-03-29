jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TurmaService } from '../service/turma.service';
import { ITurma, Turma } from '../turma.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { SerieService } from 'app/entities/serie/service/serie.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

import { TurmaUpdateComponent } from './turma-update.component';

describe('Component Tests', () => {
  describe('Turma Management Update Component', () => {
    let comp: TurmaUpdateComponent;
    let fixture: ComponentFixture<TurmaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let turmaService: TurmaService;
    let serieService: SerieService;
    let unidadeService: UnidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TurmaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TurmaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurmaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      turmaService = TestBed.inject(TurmaService);
      serieService = TestBed.inject(SerieService);
      unidadeService = TestBed.inject(UnidadeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Serie query and add missing value', () => {
        const turma: ITurma = { id: 456 };
        const serieTurma: ISerie = { id: 2953 };
        turma.serieTurma = serieTurma;

        const serieCollection: ISerie[] = [{ id: 82045 }];
        spyOn(serieService, 'query').and.returnValue(of(new HttpResponse({ body: serieCollection })));
        const additionalSeries = [serieTurma];
        const expectedCollection: ISerie[] = [...additionalSeries, ...serieCollection];
        spyOn(serieService, 'addSerieToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        expect(serieService.query).toHaveBeenCalled();
        expect(serieService.addSerieToCollectionIfMissing).toHaveBeenCalledWith(serieCollection, ...additionalSeries);
        expect(comp.seriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Unidade query and add missing value', () => {
        const turma: ITurma = { id: 456 };
        const unidadeTurma: IUnidade = { id: 99439 };
        turma.unidadeTurma = unidadeTurma;

        const unidadeCollection: IUnidade[] = [{ id: 74657 }];
        spyOn(unidadeService, 'query').and.returnValue(of(new HttpResponse({ body: unidadeCollection })));
        const additionalUnidades = [unidadeTurma];
        const expectedCollection: IUnidade[] = [...additionalUnidades, ...unidadeCollection];
        spyOn(unidadeService, 'addUnidadeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        expect(unidadeService.query).toHaveBeenCalled();
        expect(unidadeService.addUnidadeToCollectionIfMissing).toHaveBeenCalledWith(unidadeCollection, ...additionalUnidades);
        expect(comp.unidadesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const turma: ITurma = { id: 456 };
        const serieTurma: ISerie = { id: 31358 };
        turma.serieTurma = serieTurma;
        const unidadeTurma: IUnidade = { id: 10328 };
        turma.unidadeTurma = unidadeTurma;

        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(turma));
        expect(comp.seriesSharedCollection).toContain(serieTurma);
        expect(comp.unidadesSharedCollection).toContain(unidadeTurma);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const turma = { id: 123 };
        spyOn(turmaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: turma }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(turmaService.update).toHaveBeenCalledWith(turma);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const turma = new Turma();
        spyOn(turmaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: turma }));
        saveSubject.complete();

        // THEN
        expect(turmaService.create).toHaveBeenCalledWith(turma);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const turma = { id: 123 };
        spyOn(turmaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ turma });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(turmaService.update).toHaveBeenCalledWith(turma);
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

      describe('trackUnidadeById', () => {
        it('Should return tracked Unidade primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUnidadeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
