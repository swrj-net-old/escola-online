import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DiretorService } from '../service/diretor.service';

import { DiretorComponent } from './diretor.component';

describe('Component Tests', () => {
  describe('Diretor Management Component', () => {
    let comp: DiretorComponent;
    let fixture: ComponentFixture<DiretorComponent>;
    let service: DiretorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DiretorComponent],
      })
        .overrideTemplate(DiretorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiretorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(DiretorService);

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
      expect(comp.diretors?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
