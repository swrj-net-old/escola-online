jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';
import { ITipoSolicitacao, TipoSolicitacao } from '../tipo-solicitacao.model';

import { TipoSolicitacaoUpdateComponent } from './tipo-solicitacao-update.component';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Update Component', () => {
    let comp: TipoSolicitacaoUpdateComponent;
    let fixture: ComponentFixture<TipoSolicitacaoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let tipoSolicitacaoService: TipoSolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoSolicitacaoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TipoSolicitacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitacaoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      tipoSolicitacaoService = TestBed.inject(TipoSolicitacaoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const tipoSolicitacao: ITipoSolicitacao = { id: 456 };

        activatedRoute.data = of({ tipoSolicitacao });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(tipoSolicitacao));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tipoSolicitacao = { id: 123 };
        spyOn(tipoSolicitacaoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoSolicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoSolicitacao }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(tipoSolicitacaoService.update).toHaveBeenCalledWith(tipoSolicitacao);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tipoSolicitacao = new TipoSolicitacao();
        spyOn(tipoSolicitacaoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoSolicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: tipoSolicitacao }));
        saveSubject.complete();

        // THEN
        expect(tipoSolicitacaoService.create).toHaveBeenCalledWith(tipoSolicitacao);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const tipoSolicitacao = { id: 123 };
        spyOn(tipoSolicitacaoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ tipoSolicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(tipoSolicitacaoService.update).toHaveBeenCalledWith(tipoSolicitacao);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
