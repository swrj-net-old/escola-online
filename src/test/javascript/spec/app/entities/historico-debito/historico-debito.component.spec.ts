import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { HistoricoDebitoComponent } from 'app/entities/historico-debito/historico-debito.component';
import { HistoricoDebitoService } from 'app/entities/historico-debito/historico-debito.service';
import { HistoricoDebito } from 'app/shared/model/historico-debito.model';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Component', () => {
    let comp: HistoricoDebitoComponent;
    let fixture: ComponentFixture<HistoricoDebitoComponent>;
    let service: HistoricoDebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [HistoricoDebitoComponent],
      })
        .overrideTemplate(HistoricoDebitoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoDebitoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoricoDebitoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistoricoDebito(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historicoDebitos && comp.historicoDebitos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
