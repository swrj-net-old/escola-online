import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SolicitacaoService } from '../service/solicitacao.service';

import { SolicitacaoComponent } from './solicitacao.component';

describe('Component Tests', () => {
  describe('Solicitacao Management Component', () => {
    let comp: SolicitacaoComponent;
    let fixture: ComponentFixture<SolicitacaoComponent>;
    let service: SolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SolicitacaoComponent],
      })
        .overrideTemplate(SolicitacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolicitacaoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SolicitacaoService);

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
      expect(comp.solicitacaos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
