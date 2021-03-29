jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AlunoService } from '../service/aluno.service';
import { IAluno, Aluno } from '../aluno.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

import { AlunoUpdateComponent } from './aluno-update.component';

describe('Component Tests', () => {
  describe('Aluno Management Update Component', () => {
    let comp: AlunoUpdateComponent;
    let fixture: ComponentFixture<AlunoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let alunoService: AlunoService;
    let pessoaService: PessoaService;
    let escolaService: EscolaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlunoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AlunoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlunoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      alunoService = TestBed.inject(AlunoService);
      pessoaService = TestBed.inject(PessoaService);
      escolaService = TestBed.inject(EscolaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Pessoa query and add missing value', () => {
        const aluno: IAluno = { id: 456 };
        const pessoaAluno: IPessoa = { id: 75982 };
        aluno.pessoaAluno = pessoaAluno;

        const pessoaCollection: IPessoa[] = [{ id: 22971 }];
        spyOn(pessoaService, 'query').and.returnValue(of(new HttpResponse({ body: pessoaCollection })));
        const additionalPessoas = [pessoaAluno];
        const expectedCollection: IPessoa[] = [...additionalPessoas, ...pessoaCollection];
        spyOn(pessoaService, 'addPessoaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        expect(pessoaService.query).toHaveBeenCalled();
        expect(pessoaService.addPessoaToCollectionIfMissing).toHaveBeenCalledWith(pessoaCollection, ...additionalPessoas);
        expect(comp.pessoasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Escola query and add missing value', () => {
        const aluno: IAluno = { id: 456 };
        const escolaAluno: IEscola = { id: 101 };
        aluno.escolaAluno = escolaAluno;

        const escolaCollection: IEscola[] = [{ id: 63566 }];
        spyOn(escolaService, 'query').and.returnValue(of(new HttpResponse({ body: escolaCollection })));
        const additionalEscolas = [escolaAluno];
        const expectedCollection: IEscola[] = [...additionalEscolas, ...escolaCollection];
        spyOn(escolaService, 'addEscolaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        expect(escolaService.query).toHaveBeenCalled();
        expect(escolaService.addEscolaToCollectionIfMissing).toHaveBeenCalledWith(escolaCollection, ...additionalEscolas);
        expect(comp.escolasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const aluno: IAluno = { id: 456 };
        const pessoaAluno: IPessoa = { id: 97567 };
        aluno.pessoaAluno = pessoaAluno;
        const escolaAluno: IEscola = { id: 96604 };
        aluno.escolaAluno = escolaAluno;

        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(aluno));
        expect(comp.pessoasSharedCollection).toContain(pessoaAluno);
        expect(comp.escolasSharedCollection).toContain(escolaAluno);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const aluno = { id: 123 };
        spyOn(alunoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: aluno }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(alunoService.update).toHaveBeenCalledWith(aluno);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const aluno = new Aluno();
        spyOn(alunoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: aluno }));
        saveSubject.complete();

        // THEN
        expect(alunoService.create).toHaveBeenCalledWith(aluno);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const aluno = { id: 123 };
        spyOn(alunoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ aluno });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(alunoService.update).toHaveBeenCalledWith(aluno);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackPessoaById', () => {
        it('Should return tracked Pessoa primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackPessoaById(0, entity);
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
