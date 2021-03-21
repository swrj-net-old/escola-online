import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { ChamadaComponent } from 'app/entities/chamada/chamada.component';
import { ChamadaService } from 'app/entities/chamada/chamada.service';
import { Chamada } from 'app/shared/model/chamada.model';

describe('Component Tests', () => {
  describe('Chamada Management Component', () => {
    let comp: ChamadaComponent;
    let fixture: ComponentFixture<ChamadaComponent>;
    let service: ChamadaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [ChamadaComponent],
      })
        .overrideTemplate(ChamadaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChamadaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChamadaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Chamada(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chamadas && comp.chamadas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
