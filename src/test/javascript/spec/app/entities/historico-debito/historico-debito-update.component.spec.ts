import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { HistoricoDebitoUpdateComponent } from 'app/entities/historico-debito/historico-debito-update.component';
import { HistoricoDebitoService } from 'app/entities/historico-debito/historico-debito.service';
import { HistoricoDebito } from 'app/shared/model/historico-debito.model';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Update Component', () => {
    let comp: HistoricoDebitoUpdateComponent;
    let fixture: ComponentFixture<HistoricoDebitoUpdateComponent>;
    let service: HistoricoDebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [HistoricoDebitoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HistoricoDebitoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoDebitoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoricoDebitoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoricoDebito(123);
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
        const entity = new HistoricoDebito();
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
