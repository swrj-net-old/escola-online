jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SolicitacaoService } from '../service/solicitacao.service';
import { ISolicitacao, Solicitacao } from '../solicitacao.model';
import { ITipoSolicitacao } from 'app/entities/tipo-solicitacao/tipo-solicitacao.model';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/service/tipo-solicitacao.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

import { SolicitacaoUpdateComponent } from './solicitacao-update.component';

describe('Component Tests', () => {
  describe('Solicitacao Management Update Component', () => {
    let comp: SolicitacaoUpdateComponent;
    let fixture: ComponentFixture<SolicitacaoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let solicitacaoService: SolicitacaoService;
    let tipoSolicitacaoService: TipoSolicitacaoService;
    let alunoService: AlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SolicitacaoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SolicitacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolicitacaoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      solicitacaoService = TestBed.inject(SolicitacaoService);
      tipoSolicitacaoService = TestBed.inject(TipoSolicitacaoService);
      alunoService = TestBed.inject(AlunoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call TipoSolicitacao query and add missing value', () => {
        const solicitacao: ISolicitacao = { id: 456 };
        const tipoSolicitacaoSolicitacao: ITipoSolicitacao = { id: 93746 };
        solicitacao.tipoSolicitacaoSolicitacao = tipoSolicitacaoSolicitacao;

        const tipoSolicitacaoCollection: ITipoSolicitacao[] = [{ id: 21607 }];
        spyOn(tipoSolicitacaoService, 'query').and.returnValue(of(new HttpResponse({ body: tipoSolicitacaoCollection })));
        const additionalTipoSolicitacaos = [tipoSolicitacaoSolicitacao];
        const expectedCollection: ITipoSolicitacao[] = [...additionalTipoSolicitacaos, ...tipoSolicitacaoCollection];
        spyOn(tipoSolicitacaoService, 'addTipoSolicitacaoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        expect(tipoSolicitacaoService.query).toHaveBeenCalled();
        expect(tipoSolicitacaoService.addTipoSolicitacaoToCollectionIfMissing).toHaveBeenCalledWith(
          tipoSolicitacaoCollection,
          ...additionalTipoSolicitacaos
        );
        expect(comp.tipoSolicitacaosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Aluno query and add missing value', () => {
        const solicitacao: ISolicitacao = { id: 456 };
        const alunoSolicitacao: IAluno = { id: 98338 };
        solicitacao.alunoSolicitacao = alunoSolicitacao;

        const alunoCollection: IAluno[] = [{ id: 72193 }];
        spyOn(alunoService, 'query').and.returnValue(of(new HttpResponse({ body: alunoCollection })));
        const additionalAlunos = [alunoSolicitacao];
        const expectedCollection: IAluno[] = [...additionalAlunos, ...alunoCollection];
        spyOn(alunoService, 'addAlunoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        expect(alunoService.query).toHaveBeenCalled();
        expect(alunoService.addAlunoToCollectionIfMissing).toHaveBeenCalledWith(alunoCollection, ...additionalAlunos);
        expect(comp.alunosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const solicitacao: ISolicitacao = { id: 456 };
        const tipoSolicitacaoSolicitacao: ITipoSolicitacao = { id: 86194 };
        solicitacao.tipoSolicitacaoSolicitacao = tipoSolicitacaoSolicitacao;
        const alunoSolicitacao: IAluno = { id: 33997 };
        solicitacao.alunoSolicitacao = alunoSolicitacao;

        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(solicitacao));
        expect(comp.tipoSolicitacaosSharedCollection).toContain(tipoSolicitacaoSolicitacao);
        expect(comp.alunosSharedCollection).toContain(alunoSolicitacao);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const solicitacao = { id: 123 };
        spyOn(solicitacaoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: solicitacao }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(solicitacaoService.update).toHaveBeenCalledWith(solicitacao);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const solicitacao = new Solicitacao();
        spyOn(solicitacaoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: solicitacao }));
        saveSubject.complete();

        // THEN
        expect(solicitacaoService.create).toHaveBeenCalledWith(solicitacao);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const solicitacao = { id: 123 };
        spyOn(solicitacaoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ solicitacao });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(solicitacaoService.update).toHaveBeenCalledWith(solicitacao);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTipoSolicitacaoById', () => {
        it('Should return tracked TipoSolicitacao primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTipoSolicitacaoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackAlunoById', () => {
        it('Should return tracked Aluno primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAlunoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
