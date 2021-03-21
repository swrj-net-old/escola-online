import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { MateriaComponent } from 'app/entities/materia/materia.component';
import { MateriaService } from 'app/entities/materia/materia.service';
import { Materia } from 'app/shared/model/materia.model';

describe('Component Tests', () => {
  describe('Materia Management Component', () => {
    let comp: MateriaComponent;
    let fixture: ComponentFixture<MateriaComponent>;
    let service: MateriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [MateriaComponent],
      })
        .overrideTemplate(MateriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MateriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MateriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Materia(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.materias && comp.materias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
