import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { SolicitacaoDetailComponent } from 'app/entities/solicitacao/solicitacao-detail.component';
import { Solicitacao } from 'app/shared/model/solicitacao.model';

describe('Component Tests', () => {
  describe('Solicitacao Management Detail Component', () => {
    let comp: SolicitacaoDetailComponent;
    let fixture: ComponentFixture<SolicitacaoDetailComponent>;
    const route = ({ data: of({ solicitacao: new Solicitacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [SolicitacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SolicitacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SolicitacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load solicitacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.solicitacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
