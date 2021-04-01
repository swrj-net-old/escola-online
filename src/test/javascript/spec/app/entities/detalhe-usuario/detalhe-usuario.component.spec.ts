import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DetalheUsuarioComponent } from 'app/entities/detalhe-usuario/detalhe-usuario.component';
import { DetalheUsuarioService } from 'app/entities/detalhe-usuario/detalhe-usuario.service';
import { DetalheUsuario } from 'app/shared/model/detalhe-usuario.model';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Component', () => {
    let comp: DetalheUsuarioComponent;
    let fixture: ComponentFixture<DetalheUsuarioComponent>;
    let service: DetalheUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DetalheUsuarioComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(DetalheUsuarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalheUsuarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalheUsuarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalheUsuario(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalheUsuarios && comp.detalheUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalheUsuario(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalheUsuarios && comp.detalheUsuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
