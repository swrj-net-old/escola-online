import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DebitoUpdateComponent } from 'app/entities/debito/debito-update.component';
import { DebitoService } from 'app/entities/debito/debito.service';
import { Debito } from 'app/shared/model/debito.model';

describe('Component Tests', () => {
  describe('Debito Management Update Component', () => {
    let comp: DebitoUpdateComponent;
    let fixture: ComponentFixture<DebitoUpdateComponent>;
    let service: DebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DebitoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DebitoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DebitoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DebitoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Debito(123);
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
        const entity = new Debito();
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
