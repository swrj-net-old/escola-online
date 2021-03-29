import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DebitoDetailComponent } from './debito-detail.component';

describe('Component Tests', () => {
  describe('Debito Management Detail Component', () => {
    let comp: DebitoDetailComponent;
    let fixture: ComponentFixture<DebitoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DebitoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ debito: { id: 123 } }) },
          },
        ],
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
