import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaDetailComponent } from './escola-detail.component';

describe('Component Tests', () => {
  describe('Escola Management Detail Component', () => {
    let comp: EscolaDetailComponent;
    let fixture: ComponentFixture<EscolaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EscolaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ escola: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(EscolaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EscolaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load escola on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.escola).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
