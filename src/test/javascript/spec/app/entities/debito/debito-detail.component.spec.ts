import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DebitoDetailComponent } from 'app/entities/debito/debito-detail.component';
import { Debito } from 'app/shared/model/debito.model';

describe('Component Tests', () => {
  describe('Debito Management Detail Component', () => {
    let comp: DebitoDetailComponent;
    let fixture: ComponentFixture<DebitoDetailComponent>;
    const route = ({ data: of({ debito: new Debito(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DebitoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DebitoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DebitoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load debito on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.debito).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
