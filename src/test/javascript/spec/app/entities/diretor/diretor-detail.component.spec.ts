import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EscolaOnlineTestModule } from '../../../test.module';
import { DiretorDetailComponent } from 'app/entities/diretor/diretor-detail.component';
import { Diretor } from 'app/shared/model/diretor.model';

describe('Component Tests', () => {
  describe('Diretor Management Detail Component', () => {
    let comp: DiretorDetailComponent;
    let fixture: ComponentFixture<DiretorDetailComponent>;
    const route = ({ data: of({ diretor: new Diretor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EscolaOnlineTestModule],
        declarations: [DiretorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiretorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiretorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diretor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diretor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
