jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProfessorService } from '../service/professor.service';
import { IProfessor, Professor } from '../professor.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

import { ProfessorUpdateComponent } from './professor-update.component';

describe('Component Tests', () => {
  describe('Professor Management Update Component', () => {
    let comp: ProfessorUpdateComponent;
    let fixture: ComponentFixture<ProfessorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let professorService: ProfessorService;
    let pessoaService: PessoaService;
    let unidadeService: UnidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProfessorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProfessorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfessorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      professorService = TestBed.inject(ProfessorService);
      pessoaService = TestBed.inject(PessoaService);
      unidadeService = TestBed.inject(UnidadeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Pessoa query and add missing value', () => {
        const professor: IProfessor = { id: 456 };
        const pessoaProfessor: IPessoa = { id: 40497 };
        professor.pessoaProfessor = pessoaProfessor;

        const pessoaCollection: IPessoa[] = [{ id: 73113 }];
        spyOn(pessoaService, 'query').and.returnValue(of(new HttpResponse({ body: pessoaCollection })));
        const additionalPessoas = [pessoaProfessor];
        const expectedCollection: IPessoa[] = [...additionalPessoas, ...pessoaCollection];
        spyOn(pessoaService, 'addPessoaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        expect(pessoaService.query).toHaveBeenCalled();
        expect(pessoaService.addPessoaToCollectionIfMissing).toHaveBeenCalledWith(pessoaCollection, ...additionalPessoas);
        expect(comp.pessoasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Unidade query and add missing value', () => {
        const professor: IProfessor = { id: 456 };
        const unidadeProfessor: IUnidade = { id: 64184 };
        professor.unidadeProfessor = unidadeProfessor;

        const unidadeCollection: IUnidade[] = [{ id: 61573 }];
        spyOn(unidadeService, 'query').and.returnValue(of(new HttpResponse({ body: unidadeCollection })));
        const additionalUnidades = [unidadeProfessor];
        const expectedCollection: IUnidade[] = [...additionalUnidades, ...unidadeCollection];
        spyOn(unidadeService, 'addUnidadeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        expect(unidadeService.query).toHaveBeenCalled();
        expect(unidadeService.addUnidadeToCollectionIfMissing).toHaveBeenCalledWith(unidadeCollection, ...additionalUnidades);
        expect(comp.unidadesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const professor: IProfessor = { id: 456 };
        const pessoaProfessor: IPessoa = { id: 94859 };
        professor.pessoaProfessor = pessoaProfessor;
        const unidadeProfessor: IUnidade = { id: 44511 };
        professor.unidadeProfessor = unidadeProfessor;

        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(professor));
        expect(comp.pessoasSharedCollection).toContain(pessoaProfessor);
        expect(comp.unidadesSharedCollection).toContain(unidadeProfessor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const professor = { id: 123 };
        spyOn(professorService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(professorService.update).toHaveBeenCalledWith(professor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const professor = new Professor();
        spyOn(professorService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: professor }));
        saveSubject.complete();

        // THEN
        expect(professorService.create).toHaveBeenCalledWith(professor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const professor = { id: 123 };
        spyOn(professorService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ professor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(professorService.update).toHaveBeenCalledWith(professor);
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

      describe('trackUnidadeById', () => {
        it('Should return tracked Unidade primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackUnidadeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
