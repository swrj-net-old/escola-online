import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DetalheUsuarioDetailComponent } from 'app/entities/detalhe-usuario/detalhe-usuario-detail.component';
import { DetalheUsuario } from 'app/shared/model/detalhe-usuario.model';

describe('Component Tests', () => {
  describe('DetalheUsuario Management Detail Component', () => {
    let comp: DetalheUsuarioDetailComponent;
    let fixture: ComponentFixture<DetalheUsuarioDetailComponent>;
    const route = ({ data: of({ detalheUsuario: new DetalheUsuario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DetalheUsuarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
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
