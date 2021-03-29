import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DebitoService } from '../service/debito.service';

import { DebitoComponent } from './debito.component';

describe('Component Tests', () => {
  describe('Debito Management Component', () => {
    let comp: DebitoComponent;
    let fixture: ComponentFixture<DebitoComponent>;
    let service: DebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DebitoComponent],
      })
        .overrideTemplate(DebitoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DebitoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DebitoService);

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
      expect(comp.debitos?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
