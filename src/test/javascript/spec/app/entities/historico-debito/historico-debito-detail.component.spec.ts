import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { HistoricoDebitoDetailComponent } from 'app/entities/historico-debito/historico-debito-detail.component';
import { HistoricoDebito } from 'app/shared/model/historico-debito.model';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Detail Component', () => {
    let comp: HistoricoDebitoDetailComponent;
    let fixture: ComponentFixture<HistoricoDebitoDetailComponent>;
    const route = ({ data: of({ historicoDebito: new HistoricoDebito(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [HistoricoDebitoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HistoricoDebitoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoricoDebitoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historicoDebito on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historicoDebito).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
