jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PessoaService } from '../service/pessoa.service';
import { IPessoa, Pessoa } from '../pessoa.model';
import { ICidade } from 'app/entities/cidade/cidade.model';
import { CidadeService } from 'app/entities/cidade/service/cidade.service';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

import { PessoaUpdateComponent } from './pessoa-update.component';

describe('Component Tests', () => {
  describe('Pessoa Management Update Component', () => {
    let comp: PessoaUpdateComponent;
    let fixture: ComponentFixture<PessoaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let pessoaService: PessoaService;
    let cidadeService: CidadeService;
    let escolaService: EscolaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PessoaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PessoaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PessoaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      pessoaService = TestBed.inject(PessoaService);
      cidadeService = TestBed.inject(CidadeService);
      escolaService = TestBed.inject(EscolaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Cidade query and add missing value', () => {
        const pessoa: IPessoa = { id: 456 };
        const cidadePessoa: ICidade = { id: 57216 };
        pessoa.cidadePessoa = cidadePessoa;

        const cidadeCollection: ICidade[] = [{ id: 58406 }];
        spyOn(cidadeService, 'query').and.returnValue(of(new HttpResponse({ body: cidadeCollection })));
        const additionalCidades = [cidadePessoa];
        const expectedCollection: ICidade[] = [...additionalCidades, ...cidadeCollection];
        spyOn(cidadeService, 'addCidadeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        expect(cidadeService.query).toHaveBeenCalled();
        expect(cidadeService.addCidadeToCollectionIfMissing).toHaveBeenCalledWith(cidadeCollection, ...additionalCidades);
        expect(comp.cidadesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Escola query and add missing value', () => {
        const pessoa: IPessoa = { id: 456 };
        const escolaPessoa: IEscola = { id: 26304 };
        pessoa.escolaPessoa = escolaPessoa;

        const escolaCollection: IEscola[] = [{ id: 36780 }];
        spyOn(escolaService, 'query').and.returnValue(of(new HttpResponse({ body: escolaCollection })));
        const additionalEscolas = [escolaPessoa];
        const expectedCollection: IEscola[] = [...additionalEscolas, ...escolaCollection];
        spyOn(escolaService, 'addEscolaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        expect(escolaService.query).toHaveBeenCalled();
        expect(escolaService.addEscolaToCollectionIfMissing).toHaveBeenCalledWith(escolaCollection, ...additionalEscolas);
        expect(comp.escolasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const pessoa: IPessoa = { id: 456 };
        const cidadePessoa: ICidade = { id: 72519 };
        pessoa.cidadePessoa = cidadePessoa;
        const escolaPessoa: IEscola = { id: 63683 };
        pessoa.escolaPessoa = escolaPessoa;

        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(pessoa));
        expect(comp.cidadesSharedCollection).toContain(cidadePessoa);
        expect(comp.escolasSharedCollection).toContain(escolaPessoa);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = { id: 123 };
        spyOn(pessoaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoa }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(pessoaService.update).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = new Pessoa();
        spyOn(pessoaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: pessoa }));
        saveSubject.complete();

        // THEN
        expect(pessoaService.create).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const pessoa = { id: 123 };
        spyOn(pessoaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ pessoa });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(pessoaService.update).toHaveBeenCalledWith(pessoa);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCidadeById', () => {
        it('Should return tracked Cidade primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCidadeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackEscolaById', () => {
        it('Should return tracked Escola primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackEscolaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
