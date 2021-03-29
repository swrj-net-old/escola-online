import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HistoricoDebitoService } from '../service/historico-debito.service';

import { HistoricoDebitoComponent } from './historico-debito.component';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Component', () => {
    let comp: HistoricoDebitoComponent;
    let fixture: ComponentFixture<HistoricoDebitoComponent>;
    let service: HistoricoDebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HistoricoDebitoComponent],
      })
        .overrideTemplate(HistoricoDebitoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoricoDebitoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(HistoricoDebitoService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historicoDebitos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
