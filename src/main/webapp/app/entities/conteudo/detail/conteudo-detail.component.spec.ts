import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConteudoDetailComponent } from './conteudo-detail.component';

describe('Component Tests', () => {
  describe('Conteudo Management Detail Component', () => {
    let comp: ConteudoDetailComponent;
    let fixture: ComponentFixture<ConteudoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ConteudoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ conteudo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ConteudoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConteudoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load conteudo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conteudo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
