import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChamadaDetailComponent } from './chamada-detail.component';

describe('Component Tests', () => {
  describe('Chamada Management Detail Component', () => {
    let comp: ChamadaDetailComponent;
    let fixture: ComponentFixture<ChamadaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ChamadaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ chamada: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ChamadaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChamadaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chamada on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chamada).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
