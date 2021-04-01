import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DebitoComponent } from 'app/entities/debito/debito.component';
import { DebitoService } from 'app/entities/debito/debito.service';
import { Debito } from 'app/shared/model/debito.model';

describe('Component Tests', () => {
  describe('Debito Management Component', () => {
    let comp: DebitoComponent;
    let fixture: ComponentFixture<DebitoComponent>;
    let service: DebitoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DebitoComponent],
      })
        .overrideTemplate(DebitoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DebitoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DebitoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Debito(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.debitos && comp.debitos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
