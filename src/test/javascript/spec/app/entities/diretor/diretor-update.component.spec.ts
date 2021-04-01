import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DiretorUpdateComponent } from 'app/entities/diretor/diretor-update.component';
import { DiretorService } from 'app/entities/diretor/diretor.service';
import { Diretor } from 'app/shared/model/diretor.model';

describe('Component Tests', () => {
  describe('Diretor Management Update Component', () => {
    let comp: DiretorUpdateComponent;
    let fixture: ComponentFixture<DiretorUpdateComponent>;
    let service: DiretorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DiretorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiretorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiretorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiretorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Diretor(123);
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
        const entity = new Diretor();
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
