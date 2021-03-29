import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoSolicitacaoDetailComponent } from './tipo-solicitacao-detail.component';

describe('Component Tests', () => {
  describe('TipoSolicitacao Management Detail Component', () => {
    let comp: TipoSolicitacaoDetailComponent;
    let fixture: ComponentFixture<TipoSolicitacaoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TipoSolicitacaoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tipoSolicitacao: { id: 123 } }) },
          },
        ],
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
