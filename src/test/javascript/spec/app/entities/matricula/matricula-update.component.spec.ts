import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { MatriculaUpdateComponent } from 'app/entities/matricula/matricula-update.component';
import { MatriculaService } from 'app/entities/matricula/matricula.service';
import { Matricula } from 'app/shared/model/matricula.model';

describe('Component Tests', () => {
  describe('Matricula Management Update Component', () => {
    let comp: MatriculaUpdateComponent;
    let fixture: ComponentFixture<MatriculaUpdateComponent>;
    let service: MatriculaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [MatriculaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MatriculaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatriculaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MatriculaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Matricula(123);
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
        const entity = new Matricula();
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
