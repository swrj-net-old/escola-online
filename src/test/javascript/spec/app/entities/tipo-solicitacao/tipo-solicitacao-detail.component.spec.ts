import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { TipoSolicitacaoDetailComponent } from 'app/entities/tipo-solicitacao/tipo-solicitacao-detail.component';
import { TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Detail Component', () => {
    let comp: TipoSolicitacaoDetailComponent;
    let fixture: ComponentFixture<TipoSolicitacaoDetailComponent>;
    const route = ({ data: of({ tipoSolicitacao: new TipoSolicitacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [TipoSolicitacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoSolicitacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoSolicitacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoSolicitacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoSolicitacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
