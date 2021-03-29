import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ChamadaService } from '../service/chamada.service';

import { ChamadaComponent } from './chamada.component';

describe('Component Tests', () => {
  describe('Chamada Management Component', () => {
    let comp: ChamadaComponent;
    let fixture: ComponentFixture<ChamadaComponent>;
    let service: ChamadaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ChamadaComponent],
      })
        .overrideTemplate(ChamadaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChamadaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ChamadaService);

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
      expect(comp.chamadas?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
