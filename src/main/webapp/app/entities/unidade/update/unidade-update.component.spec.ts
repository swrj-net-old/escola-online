jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { UnidadeService } from '../service/unidade.service';
import { IUnidade, Unidade } from '../unidade.model';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

import { UnidadeUpdateComponent } from './unidade-update.component';

describe('Component Tests', () => {
  describe('Unidade Management Update Component', () => {
    let comp: UnidadeUpdateComponent;
    let fixture: ComponentFixture<UnidadeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let unidadeService: UnidadeService;
    let escolaService: EscolaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UnidadeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(UnidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      unidadeService = TestBed.inject(UnidadeService);
      escolaService = TestBed.inject(EscolaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Escola query and add missing value', () => {
        const unidade: IUnidade = { id: 456 };
        const escolaUnidade: IEscola = { id: 51625 };
        unidade.escolaUnidade = escolaUnidade;

        const escolaCollection: IEscola[] = [{ id: 840 }];
        spyOn(escolaService, 'query').and.returnValue(of(new HttpResponse({ body: escolaCollection })));
        const additionalEscolas = [escolaUnidade];
        const expectedCollection: IEscola[] = [...additionalEscolas, ...escolaCollection];
        spyOn(escolaService, 'addEscolaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ unidade });
        comp.ngOnInit();

        expect(escolaService.query).toHaveBeenCalled();
        expect(escolaService.addEscolaToCollectionIfMissing).toHaveBeenCalledWith(escolaCollection, ...additionalEscolas);
        expect(comp.escolasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const unidade: IUnidade = { id: 456 };
        const escolaUnidade: IEscola = { id: 37934 };
        unidade.escolaUnidade = escolaUnidade;

        activatedRoute.data = of({ unidade });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(unidade));
        expect(comp.escolasSharedCollection).toContain(escolaUnidade);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const unidade = { id: 123 };
        spyOn(unidadeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ unidade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: unidade }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(unidadeService.update).toHaveBeenCalledWith(unidade);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const unidade = new Unidade();
        spyOn(unidadeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ unidade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: unidade }));
        saveSubject.complete();

        // THEN
        expect(unidadeService.create).toHaveBeenCalledWith(unidade);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const unidade = { id: 123 };
        spyOn(unidadeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ unidade });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(unidadeService.update).toHaveBeenCalledWith(unidade);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEscolaById', () => {
        it('Should return tracked Escola primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEscolaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
