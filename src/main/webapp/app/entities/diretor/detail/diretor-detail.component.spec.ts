import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiretorDetailComponent } from './diretor-detail.component';

describe('Component Tests', () => {
  describe('Diretor Management Detail Component', () => {
    let comp: DiretorDetailComponent;
    let fixture: ComponentFixture<DiretorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DiretorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ diretor: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DiretorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiretorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diretor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diretor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
