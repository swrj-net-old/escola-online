import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SerieService } from '../service/serie.service';

import { SerieComponent } from './serie.component';

describe('Component Tests', () => {
  describe('Serie Management Component', () => {
    let comp: SerieComponent;
    let fixture: ComponentFixture<SerieComponent>;
    let service: SerieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SerieComponent],
      })
        .overrideTemplate(SerieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SerieComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SerieService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.series?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
