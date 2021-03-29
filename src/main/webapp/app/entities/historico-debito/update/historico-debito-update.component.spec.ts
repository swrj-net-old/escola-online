jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HistoricoDebitoService } from '../service/historico-debito.service';
import { IHistoricoDebito, HistoricoDebito } from '../historico-debito.model';
import { IDebito } from 'app/entities/debito/debito.model';
import { DebitoService } from 'app/entities/debito/service/debito.service';
import { IDetalheUsuario } from 'app/entities/detalhe-usuario/detalhe-usuario.model';
import { DetalheUsuarioService } from 'app/entities/detalhe-usuario/service/detalhe-usuario.service';

import { HistoricoDebitoUpdateComponent } from './historico-debito-update.component';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Update Component', () => {
    let comp: HistoricoDebitoUpdateComponent;
    let fixture: ComponentFixture<HistoricoDebitoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let historicoDebitoService: HistoricoDebitoService;
    let debitoService: DebitoService;
    let detalheUsuarioService: DetalheUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HistoricoDebitoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(HistoricoDebitoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoDebitoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      historicoDebitoService = TestBed.inject(HistoricoDebitoService);
      debitoService = TestBed.inject(DebitoService);
      detalheUsuarioService = TestBed.inject(DetalheUsuarioService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Debito query and add missing value', () => {
        const historicoDebito: IHistoricoDebito = { id: 456 };
        const debitoHistoricoDebito: IDebito = { id: 53237 };
        historicoDebito.debitoHistoricoDebito = debitoHistoricoDebito;

        const debitoCollection: IDebito[] = [{ id: 9618 }];
        spyOn(debitoService, 'query').and.returnValue(of(new HttpResponse({ body: debitoCollection })));
        const additionalDebitos = [debitoHistoricoDebito];
        const expectedCollection: IDebito[] = [...additionalDebitos, ...debitoCollection];
        spyOn(debitoService, 'addDebitoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        expect(debitoService.query).toHaveBeenCalled();
        expect(debitoService.addDebitoToCollectionIfMissing).toHaveBeenCalledWith(debitoCollection, ...additionalDebitos);
        expect(comp.debitosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DetalheUsuario query and add missing value', () => {
        const historicoDebito: IHistoricoDebito = { id: 456 };
        const detalheUsuarioLancamento: IDetalheUsuario = { id: 35507 };
        historicoDebito.detalheUsuarioLancamento = detalheUsuarioLancamento;

        const detalheUsuarioCollection: IDetalheUsuario[] = [{ id: 45772 }];
        spyOn(detalheUsuarioService, 'query').and.returnValue(of(new HttpResponse({ body: detalheUsuarioCollection })));
        const additionalDetalheUsuarios = [detalheUsuarioLancamento];
        const expectedCollection: IDetalheUsuario[] = [...additionalDetalheUsuarios, ...detalheUsuarioCollection];
        spyOn(detalheUsuarioService, 'addDetalheUsuarioToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        expect(detalheUsuarioService.query).toHaveBeenCalled();
        expect(detalheUsuarioService.addDetalheUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
          detalheUsuarioCollection,
          ...additionalDetalheUsuarios
        );
        expect(comp.detalheUsuariosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const historicoDebito: IHistoricoDebito = { id: 456 };
        const debitoHistoricoDebito: IDebito = { id: 82811 };
        historicoDebito.debitoHistoricoDebito = debitoHistoricoDebito;
        const detalheUsuarioLancamento: IDetalheUsuario = { id: 3768 };
        historicoDebito.detalheUsuarioLancamento = detalheUsuarioLancamento;

        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(historicoDebito));
        expect(comp.debitosSharedCollection).toContain(debitoHistoricoDebito);
        expect(comp.detalheUsuariosSharedCollection).toContain(detalheUsuarioLancamento);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const historicoDebito = { id: 123 };
        spyOn(historicoDebitoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: historicoDebito }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(historicoDebitoService.update).toHaveBeenCalledWith(historicoDebito);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const historicoDebito = new HistoricoDebito();
        spyOn(historicoDebitoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: historicoDebito }));
        saveSubject.complete();

        // THEN
        expect(historicoDebitoService.create).toHaveBeenCalledWith(historicoDebito);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const historicoDebito = { id: 123 };
        spyOn(historicoDebitoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ historicoDebito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(historicoDebitoService.update).toHaveBeenCalledWith(historicoDebito);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackDebitoById', () => {
        it('Should return tracked Debito primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDebitoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackDetalheUsuarioById', () => {
        it('Should return tracked DetalheUsuario primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackDetalheUsuarioById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
