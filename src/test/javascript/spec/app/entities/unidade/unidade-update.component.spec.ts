import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { UnidadeUpdateComponent } from 'app/entities/unidade/unidade-update.component';
import { UnidadeService } from 'app/entities/unidade/unidade.service';
import { Unidade } from 'app/shared/model/unidade.model';

describe('Component Tests', () => {
  describe('Unidade Management Update Component', () => {
    let comp: UnidadeUpdateComponent;
    let fixture: ComponentFixture<UnidadeUpdateComponent>;
    let service: UnidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [UnidadeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UnidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Unidade(123);
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
        const entity = new Unidade();
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
