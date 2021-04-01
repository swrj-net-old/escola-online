import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { TipoSolicitacaoUpdateComponent } from 'app/entities/tipo-solicitacao/tipo-solicitacao-update.component';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/tipo-solicitacao.service';
import { TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Update Component', () => {
    let comp: TipoSolicitacaoUpdateComponent;
    let fixture: ComponentFixture<TipoSolicitacaoUpdateComponent>;
    let service: TipoSolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [TipoSolicitacaoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoSolicitacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSolicitacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoSolicitacao(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoSolicitacao();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
