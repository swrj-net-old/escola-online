import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HistoricoDebitoDetailComponent } from './historico-debito-detail.component';

describe('Component Tests', () => {
  describe('HistoricoDebito Management Detail Component', () => {
    let comp: HistoricoDebitoDetailComponent;
    let fixture: ComponentFixture<HistoricoDebitoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HistoricoDebitoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ historicoDebito: { id: 123 } }) },
          },
        ],
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
