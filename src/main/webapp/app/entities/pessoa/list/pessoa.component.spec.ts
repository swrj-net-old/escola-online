import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PessoaService } from '../service/pessoa.service';

import { PessoaComponent } from './pessoa.component';

describe('Component Tests', () => {
  describe('Pessoa Management Component', () => {
    let comp: PessoaComponent;
    let fixture: ComponentFixture<PessoaComponent>;
    let service: PessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PessoaComponent],
      })
        .overrideTemplate(PessoaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PessoaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PessoaService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pessoas?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
