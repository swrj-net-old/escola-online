jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DetalheUsuarioService } from '../service/detalhe-usuario.service';
import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { DetalheUsuarioUpdateComponent } from './detalhe-usuario-update.component';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Update Component', () => {
    let comp: DetalheUsuarioUpdateComponent;
    let fixture: ComponentFixture<DetalheUsuarioUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let detalheUsuarioService: DetalheUsuarioService;
    let userService: UserService;

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
      userService = TestBed.inject(UserService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call User query and add missing value', () => {
        const detalheUsuario: IDetalheUsuario = { id: 456 };
        const usuario: IUser = { id: 55356 };
        detalheUsuario.usuario = usuario;

        const userCollection: IUser[] = [{ id: 16145 }];
        spyOn(userService, 'query').and.returnValue(of(new HttpResponse({ body: userCollection })));
        const additionalUsers = [usuario];
        const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
        spyOn(userService, 'addUserToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        expect(userService.query).toHaveBeenCalled();
        expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
        expect(comp.usersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const detalheUsuario: IDetalheUsuario = { id: 456 };
        const usuario: IUser = { id: 51045 };
        detalheUsuario.usuario = usuario;

        activatedRoute.data = of({ detalheUsuario });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(detalheUsuario));
        expect(comp.usersSharedCollection).toContain(usuario);
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

    describe('Tracking relationships identifiers', () => {
      describe('trackUserById', () => {
        it('Should return tracked User primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUserById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
