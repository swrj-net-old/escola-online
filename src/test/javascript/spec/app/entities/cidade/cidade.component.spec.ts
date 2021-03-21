import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EscolaOnlineTestModule } from '../../../test.module';
import { CidadeComponent } from 'app/entities/cidade/cidade.component';
import { CidadeService } from 'app/entities/cidade/cidade.service';
import { Cidade } from 'app/shared/model/cidade.model';

describe('Component Tests', () => {
  describe('Cidade Management Component', () => {
    let comp: CidadeComponent;
    let fixture: ComponentFixture<CidadeComponent>;
    let service: CidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [CidadeComponent],
      })
        .overrideTemplate(CidadeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CidadeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CidadeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cidade(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cidades && comp.cidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
