import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DetalheUsuarioUpdateComponent } from 'app/entities/detalhe-usuario/detalhe-usuario-update.component';
import { DetalheUsuarioService } from 'app/entities/detalhe-usuario/detalhe-usuario.service';
import { DetalheUsuario } from 'app/shared/model/detalhe-usuario.model';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Update Component', () => {
    let comp: DetalheUsuarioUpdateComponent;
    let fixture: ComponentFixture<DetalheUsuarioUpdateComponent>;
    let service: DetalheUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DetalheUsuarioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DetalheUsuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalheUsuarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalheUsuarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalheUsuario(123);
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
        const entity = new DetalheUsuario();
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
