import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetalheUsuarioDetailComponent } from './detalhe-usuario-detail.component';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Detail Component', () => {
    let comp: DetalheUsuarioDetailComponent;
    let fixture: ComponentFixture<DetalheUsuarioDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DetalheUsuarioDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ detalheUsuario: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(DetalheUsuarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalheUsuarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detalheUsuario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalheUsuario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
