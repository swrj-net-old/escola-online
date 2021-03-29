import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DiretorComponent } from 'app/entities/diretor/diretor.component';
import { DiretorService } from 'app/entities/diretor/diretor.service';
import { Diretor } from 'app/shared/model/diretor.model';

describe('Component Tests', () => {
  describe('Diretor Management Component', () => {
    let comp: DiretorComponent;
    let fixture: ComponentFixture<DiretorComponent>;
    let service: DiretorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DiretorComponent],
      })
        .overrideTemplate(DiretorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiretorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiretorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Diretor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diretors && comp.diretors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
