import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { SolicitacaoComponent } from 'app/entities/solicitacao/solicitacao.component';
import { SolicitacaoService } from 'app/entities/solicitacao/solicitacao.service';
import { Solicitacao } from 'app/shared/model/solicitacao.model';

describe('Component Tests', () => {
  describe('Solicitacao Management Component', () => {
    let comp: SolicitacaoComponent;
    let fixture: ComponentFixture<SolicitacaoComponent>;
    let service: SolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [SolicitacaoComponent],
      })
        .overrideTemplate(SolicitacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolicitacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolicitacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Solicitacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.solicitacaos && comp.solicitacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
