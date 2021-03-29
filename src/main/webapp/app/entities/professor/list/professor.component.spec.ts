import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProfessorService } from '../service/professor.service';

import { ProfessorComponent } from './professor.component';

describe('Component Tests', () => {
  describe('Professor Management Component', () => {
    let comp: ProfessorComponent;
    let fixture: ComponentFixture<ProfessorComponent>;
    let service: ProfessorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessorComponent],
      })
        .overrideTemplate(ProfessorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProfessorService);

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
      expect(comp.professors?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
