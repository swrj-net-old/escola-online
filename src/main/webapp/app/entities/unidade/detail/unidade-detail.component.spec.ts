import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnidadeDetailComponent } from './unidade-detail.component';

describe('Component Tests', () => {
  describe('Unidade Management Detail Component', () => {
    let comp: UnidadeDetailComponent;
    let fixture: ComponentFixture<UnidadeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UnidadeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ unidade: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(UnidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load unidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
