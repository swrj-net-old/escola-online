import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { MatriculaDetailComponent } from 'app/entities/matricula/matricula-detail.component';
import { Matricula } from 'app/shared/model/matricula.model';

describe('Component Tests', () => {
  describe('Matricula Management Detail Component', () => {
    let comp: MatriculaDetailComponent;
    let fixture: ComponentFixture<MatriculaDetailComponent>;
    const route = ({ data: of({ matricula: new Matricula(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [MatriculaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MatriculaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MatriculaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load matricula on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.matricula).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
