import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { TipoSolicitacaoComponent } from 'app/entities/tipo-solicitacao/tipo-solicitacao.component';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/tipo-solicitacao.service';
import { TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Component', () => {
    let comp: TipoSolicitacaoComponent;
    let fixture: ComponentFixture<TipoSolicitacaoComponent>;
    let service: TipoSolicitacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [TipoSolicitacaoComponent],
      })
        .overrideTemplate(TipoSolicitacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSolicitacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSolicitacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoSolicitacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSolicitacaos && comp.tipoSolicitacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
