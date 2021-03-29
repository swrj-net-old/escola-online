import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { UnidadeDetailComponent } from 'app/entities/unidade/unidade-detail.component';
import { Unidade } from 'app/shared/model/unidade.model';

describe('Component Tests', () => {
  describe('Unidade Management Detail Component', () => {
    let comp: UnidadeDetailComponent;
    let fixture: ComponentFixture<UnidadeDetailComponent>;
    const route = ({ data: of({ unidade: new Unidade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [UnidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UnidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load unidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
