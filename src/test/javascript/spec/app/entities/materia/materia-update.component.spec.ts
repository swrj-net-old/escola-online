import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { MateriaUpdateComponent } from 'app/entities/materia/materia-update.component';
import { MateriaService } from 'app/entities/materia/materia.service';
import { Materia } from 'app/shared/model/materia.model';

describe('Component Tests', () => {
  describe('Materia Management Update Component', () => {
    let comp: MateriaUpdateComponent;
    let fixture: ComponentFixture<MateriaUpdateComponent>;
    let service: MateriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [MateriaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MateriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MateriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MateriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Materia(123);
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
        const entity = new Materia();
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
