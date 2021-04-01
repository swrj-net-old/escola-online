import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

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
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
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

    it('should load a page', () => {
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
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSolicitacaos && comp.tipoSolicitacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
