import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { MatriculaComponent } from 'app/entities/matricula/matricula.component';
import { MatriculaService } from 'app/entities/matricula/matricula.service';
import { Matricula } from 'app/shared/model/matricula.model';

describe('Component Tests', () => {
  describe('Matricula Management Component', () => {
    let comp: MatriculaComponent;
    let fixture: ComponentFixture<MatriculaComponent>;
    let service: MatriculaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [MatriculaComponent],
      })
        .overrideTemplate(MatriculaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatriculaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MatriculaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Matricula(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.matriculas && comp.matriculas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
