import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { ChamadaUpdateComponent } from 'app/entities/chamada/chamada-update.component';
import { ChamadaService } from 'app/entities/chamada/chamada.service';
import { Chamada } from 'app/shared/model/chamada.model';

describe('Component Tests', () => {
  describe('Chamada Management Update Component', () => {
    let comp: ChamadaUpdateComponent;
    let fixture: ComponentFixture<ChamadaUpdateComponent>;
    let service: ChamadaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [ChamadaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChamadaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChamadaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChamadaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chamada(123);
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
        const entity = new Chamada();
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
