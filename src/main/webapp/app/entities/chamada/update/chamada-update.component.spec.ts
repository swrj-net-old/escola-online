jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ChamadaService } from '../service/chamada.service';
import { IChamada, Chamada } from '../chamada.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IProfessor } from 'app/entities/professor/professor.model';
import { ProfessorService } from 'app/entities/professor/service/professor.service';

import { ChamadaUpdateComponent } from './chamada-update.component';

describe('Component Tests', () => {
  describe('Chamada Management Update Component', () => {
    let comp: ChamadaUpdateComponent;
    let fixture: ComponentFixture<ChamadaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let chamadaService: ChamadaService;
    let alunoService: AlunoService;
    let turmaService: TurmaService;
    let professorService: ProfessorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ChamadaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ChamadaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChamadaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      chamadaService = TestBed.inject(ChamadaService);
      alunoService = TestBed.inject(AlunoService);
      turmaService = TestBed.inject(TurmaService);
      professorService = TestBed.inject(ProfessorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Aluno query and add missing value', () => {
        const chamada: IChamada = { id: 456 };
        const alunoChamada: IAluno = { id: 66211 };
        chamada.alunoChamada = alunoChamada;

        const alunoCollection: IAluno[] = [{ id: 48381 }];
        spyOn(alunoService, 'query').and.returnValue(of(new HttpResponse({ body: alunoCollection })));
        const additionalAlunos = [alunoChamada];
        const expectedCollection: IAluno[] = [...additionalAlunos, ...alunoCollection];
        spyOn(alunoService, 'addAlunoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        expect(alunoService.query).toHaveBeenCalled();
        expect(alunoService.addAlunoToCollectionIfMissing).toHaveBeenCalledWith(alunoCollection, ...additionalAlunos);
        expect(comp.alunosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Turma query and add missing value', () => {
        const chamada: IChamada = { id: 456 };
        const turmaChamada: ITurma = { id: 93852 };
        chamada.turmaChamada = turmaChamada;

        const turmaCollection: ITurma[] = [{ id: 5551 }];
        spyOn(turmaService, 'query').and.returnValue(of(new HttpResponse({ body: turmaCollection })));
        const additionalTurmas = [turmaChamada];
        const expectedCollection: ITurma[] = [...additionalTurmas, ...turmaCollection];
        spyOn(turmaService, 'addTurmaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        expect(turmaService.query).toHaveBeenCalled();
        expect(turmaService.addTurmaToCollectionIfMissing).toHaveBeenCalledWith(turmaCollection, ...additionalTurmas);
        expect(comp.turmasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Professor query and add missing value', () => {
        const chamada: IChamada = { id: 456 };
        const professorChamada: IProfessor = { id: 74378 };
        chamada.professorChamada = professorChamada;

        const professorCollection: IProfessor[] = [{ id: 95590 }];
        spyOn(professorService, 'query').and.returnValue(of(new HttpResponse({ body: professorCollection })));
        const additionalProfessors = [professorChamada];
        const expectedCollection: IProfessor[] = [...additionalProfessors, ...professorCollection];
        spyOn(professorService, 'addProfessorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        expect(professorService.query).toHaveBeenCalled();
        expect(professorService.addProfessorToCollectionIfMissing).toHaveBeenCalledWith(professorCollection, ...additionalProfessors);
        expect(comp.professorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const chamada: IChamada = { id: 456 };
        const alunoChamada: IAluno = { id: 78129 };
        chamada.alunoChamada = alunoChamada;
        const turmaChamada: ITurma = { id: 38111 };
        chamada.turmaChamada = turmaChamada;
        const professorChamada: IProfessor = { id: 34136 };
        chamada.professorChamada = professorChamada;

        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(chamada));
        expect(comp.alunosSharedCollection).toContain(alunoChamada);
        expect(comp.turmasSharedCollection).toContain(turmaChamada);
        expect(comp.professorsSharedCollection).toContain(professorChamada);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const chamada = { id: 123 };
        spyOn(chamadaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: chamada }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(chamadaService.update).toHaveBeenCalledWith(chamada);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const chamada = new Chamada();
        spyOn(chamadaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: chamada }));
        saveSubject.complete();

        // THEN
        expect(chamadaService.create).toHaveBeenCalledWith(chamada);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const chamada = { id: 123 };
        spyOn(chamadaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ chamada });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(chamadaService.update).toHaveBeenCalledWith(chamada);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackAlunoById', () => {
        it('Should return tracked Aluno primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackAlunoById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTurmaById', () => {
        it('Should return tracked Turma primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTurmaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackProfessorById', () => {
        it('Should return tracked Professor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProfessorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
