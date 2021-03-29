import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { EscolaComponent } from 'app/entities/escola/escola.component';
import { EscolaService } from 'app/entities/escola/escola.service';
import { Escola } from 'app/shared/model/escola.model';

describe('Component Tests', () => {
  describe('Escola Management Component', () => {
    let comp: EscolaComponent;
    let fixture: ComponentFixture<EscolaComponent>;
    let service: EscolaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [EscolaComponent],
      })
        .overrideTemplate(EscolaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EscolaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EscolaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Escola(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.escolas && comp.escolas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});