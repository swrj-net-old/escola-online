jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetalheUsuarioService } from '../service/detalhe-usuario.service';
import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';

import { DetalheUsuarioUpdateComponent } from './detalhe-usuario-update.component';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Update Component', () => {
    let comp: DetalheUsuarioUpdateComponent;
    let fixture: ComponentFixture<DetalheUsuarioUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detalheUsuarioService: DetalheUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DetalheUsuarioUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DetalheUsuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalheUsuarioUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      detalheUsuarioService = TestBed.inject(DetalheUsuarioService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const detalheUsuario: IDetalheUsuario = { id: 456 };

        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detalheUsuario));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const detalheUsuario = { id: 123 };
        spyOn(detalheUsuarioService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detalheUsuario }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(detalheUsuarioService.update).toHaveBeenCalledWith(detalheUsuario);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const detalheUsuario = new DetalheUsuario();
        spyOn(detalheUsuarioService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: detalheUsuario }));
        saveSubject.complete();

        // THEN
        expect(detalheUsuarioService.create).toHaveBeenCalledWith(detalheUsuario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const detalheUsuario = { id: 123 };
        spyOn(detalheUsuarioService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(detalheUsuarioService.update).toHaveBeenCalledWith(detalheUsuario);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
