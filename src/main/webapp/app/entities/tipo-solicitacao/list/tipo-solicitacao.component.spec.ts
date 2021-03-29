import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';

import { TipoSolicitacaoComponent } from './tipo-solicitacao.component';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Component', () => {
    let comp: TipoSolicitacaoComponent;
    let fixture: ComponentFixture<TipoSolicitacaoComponent>;
    let service: TipoSolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoSolicitacaoComponent],
      })
        .overrideTemplate(TipoSolicitacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitacaoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TipoSolicitacaoService);

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
      expect(comp.tipoSolicitacaos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
