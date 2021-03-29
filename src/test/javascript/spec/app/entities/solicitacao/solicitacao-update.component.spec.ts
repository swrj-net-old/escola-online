import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { SolicitacaoUpdateComponent } from 'app/entities/solicitacao/solicitacao-update.component';
import { SolicitacaoService } from 'app/entities/solicitacao/solicitacao.service';
import { Solicitacao } from 'app/shared/model/solicitacao.model';

describe('Component Tests', () => {
  describe('Solicitacao Management Update Component', () => {
    let comp: SolicitacaoUpdateComponent;
    let fixture: ComponentFixture<SolicitacaoUpdateComponent>;
    let service: SolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [SolicitacaoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SolicitacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolicitacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolicitacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Solicitacao(123);
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
        const entity = new Solicitacao();
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
