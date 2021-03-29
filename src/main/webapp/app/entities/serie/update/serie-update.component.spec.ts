jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SerieService } from '../service/serie.service';
import { ISerie, Serie } from '../serie.model';

import { SerieUpdateComponent } from './serie-update.component';

describe('Component Tests', () => {
  describe('Serie Management Update Component', () => {
    let comp: SerieUpdateComponent;
    let fixture: ComponentFixture<SerieUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let serieService: SerieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SerieUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SerieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SerieUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      serieService = TestBed.inject(SerieService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const serie: ISerie = { id: 456 };

        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(serie));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const serie = { id: 123 };
        spyOn(serieService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: serie }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(serieService.update).toHaveBeenCalledWith(serie);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const serie = new Serie();
        spyOn(serieService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: serie }));
        saveSubject.complete();

        // THEN
        expect(serieService.create).toHaveBeenCalledWith(serie);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const serie = { id: 123 };
        spyOn(serieService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ serie });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(serieService.update).toHaveBeenCalledWith(serie);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
