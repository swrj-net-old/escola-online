jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EscolaService } from '../service/escola.service';
import { IEscola, Escola } from '../escola.model';

import { EscolaUpdateComponent } from './escola-update.component';

describe('Component Tests', () => {
  describe('Escola Management Update Component', () => {
    let comp: EscolaUpdateComponent;
    let fixture: ComponentFixture<EscolaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let escolaService: EscolaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EscolaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EscolaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscolaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      escolaService = TestBed.inject(EscolaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const escola: IEscola = { id: 456 };

        activatedRoute.data = of({ escola });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(escola));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const escola = { id: 123 };
        spyOn(escolaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ escola });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: escola }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(escolaService.update).toHaveBeenCalledWith(escola);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const escola = new Escola();
        spyOn(escolaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ escola });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: escola }));
        saveSubject.complete();

        // THEN
        expect(escolaService.create).toHaveBeenCalledWith(escola);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const escola = { id: 123 };
        spyOn(escolaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ escola });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(escolaService.update).toHaveBeenCalledWith(escola);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
