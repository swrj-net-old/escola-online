import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { SerieDetailComponent } from 'app/entities/serie/serie-detail.component';
import { Serie } from 'app/shared/model/serie.model';

describe('Component Tests', () => {
  describe('Serie Management Detail Component', () => {
    let comp: SerieDetailComponent;
    let fixture: ComponentFixture<SerieDetailComponent>;
    const route = ({ data: of({ serie: new Serie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [SerieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SerieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SerieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
