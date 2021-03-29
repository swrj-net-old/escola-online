jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DiretorService } from '../service/diretor.service';
import { IDiretor, Diretor } from '../diretor.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

import { DiretorUpdateComponent } from './diretor-update.component';

describe('Component Tests', () => {
  describe('Diretor Management Update Component', () => {
    let comp: DiretorUpdateComponent;
    let fixture: ComponentFixture<DiretorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let diretorService: DiretorService;
    let pessoaService: PessoaService;
    let unidadeService: UnidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DiretorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DiretorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiretorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      diretorService = TestBed.inject(DiretorService);
      pessoaService = TestBed.inject(PessoaService);
      unidadeService = TestBed.inject(UnidadeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Pessoa query and add missing value', () => {
        const diretor: IDiretor = { id: 456 };
        const pessoaDiretor: IPessoa = { id: 6250 };
        diretor.pessoaDiretor = pessoaDiretor;

        const pessoaCollection: IPessoa[] = [{ id: 75669 }];
        spyOn(pessoaService, 'query').and.returnValue(of(new HttpResponse({ body: pessoaCollection })));
        const additionalPessoas = [pessoaDiretor];
        const expectedCollection: IPessoa[] = [...additionalPessoas, ...pessoaCollection];
        spyOn(pessoaService, 'addPessoaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        expect(pessoaService.query).toHaveBeenCalled();
        expect(pessoaService.addPessoaToCollectionIfMissing).toHaveBeenCalledWith(pessoaCollection, ...additionalPessoas);
        expect(comp.pessoasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Unidade query and add missing value', () => {
        const diretor: IDiretor = { id: 456 };
        const unidadeDiretor: IUnidade = { id: 13415 };
        diretor.unidadeDiretor = unidadeDiretor;

        const unidadeCollection: IUnidade[] = [{ id: 8345 }];
        spyOn(unidadeService, 'query').and.returnValue(of(new HttpResponse({ body: unidadeCollection })));
        const additionalUnidades = [unidadeDiretor];
        const expectedCollection: IUnidade[] = [...additionalUnidades, ...unidadeCollection];
        spyOn(unidadeService, 'addUnidadeToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        expect(unidadeService.query).toHaveBeenCalled();
        expect(unidadeService.addUnidadeToCollectionIfMissing).toHaveBeenCalledWith(unidadeCollection, ...additionalUnidades);
        expect(comp.unidadesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const diretor: IDiretor = { id: 456 };
        const pessoaDiretor: IPessoa = { id: 35064 };
        diretor.pessoaDiretor = pessoaDiretor;
        const unidadeDiretor: IUnidade = { id: 34594 };
        diretor.unidadeDiretor = unidadeDiretor;

        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(diretor));
        expect(comp.pessoasSharedCollection).toContain(pessoaDiretor);
        expect(comp.unidadesSharedCollection).toContain(unidadeDiretor);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const diretor = { id: 123 };
        spyOn(diretorService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: diretor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(diretorService.update).toHaveBeenCalledWith(diretor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const diretor = new Diretor();
        spyOn(diretorService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: diretor }));
        saveSubject.complete();

        // THEN
        expect(diretorService.create).toHaveBeenCalledWith(diretor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const diretor = { id: 123 };
        spyOn(diretorService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ diretor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(diretorService.update).toHaveBeenCalledWith(diretor);
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
