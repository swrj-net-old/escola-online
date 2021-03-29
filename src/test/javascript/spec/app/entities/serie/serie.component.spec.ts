import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { SerieComponent } from 'app/entities/serie/serie.component';
import { SerieService } from 'app/entities/serie/serie.service';
import { Serie } from 'app/shared/model/serie.model';

describe('Component Tests', () => {
  describe('Serie Management Component', () => {
    let comp: SerieComponent;
    let fixture: ComponentFixture<SerieComponent>;
    let service: SerieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [SerieComponent],
      })
        .overrideTemplate(SerieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SerieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SerieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Serie(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.series && comp.series[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});