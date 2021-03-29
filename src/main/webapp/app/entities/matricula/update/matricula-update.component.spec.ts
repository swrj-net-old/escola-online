jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MatriculaService } from '../service/matricula.service';
import { IMatricula, Matricula } from '../matricula.model';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

import { MatriculaUpdateComponent } from './matricula-update.component';

describe('Component Tests', () => {
  describe('Matricula Management Update Component', () => {
    let comp: MatriculaUpdateComponent;
    let fixture: ComponentFixture<MatriculaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let matriculaService: MatriculaService;
    let turmaService: TurmaService;
    let alunoService: AlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MatriculaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MatriculaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MatriculaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      matriculaService = TestBed.inject(MatriculaService);
      turmaService = TestBed.inject(TurmaService);
      alunoService = TestBed.inject(AlunoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Turma query and add missing value', () => {
        const matricula: IMatricula = { id: 456 };
        const turmaMatricula: ITurma = { id: 60367 };
        matricula.turmaMatricula = turmaMatricula;

        const turmaCollection: ITurma[] = [{ id: 95218 }];
        spyOn(turmaService, 'query').and.returnValue(of(new HttpResponse({ body: turmaCollection })));
        const additionalTurmas = [turmaMatricula];
        const expectedCollection: ITurma[] = [...additionalTurmas, ...turmaCollection];
        spyOn(turmaService, 'addTurmaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        expect(turmaService.query).toHaveBeenCalled();
        expect(turmaService.addTurmaToCollectionIfMissing).toHaveBeenCalledWith(turmaCollection, ...additionalTurmas);
        expect(comp.turmasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Aluno query and add missing value', () => {
        const matricula: IMatricula = { id: 456 };
        const alunoMatricula: IAluno = { id: 92522 };
        matricula.alunoMatricula = alunoMatricula;

        const alunoCollection: IAluno[] = [{ id: 61929 }];
        spyOn(alunoService, 'query').and.returnValue(of(new HttpResponse({ body: alunoCollection })));
        const additionalAlunos = [alunoMatricula];
        const expectedCollection: IAluno[] = [...additionalAlunos, ...alunoCollection];
        spyOn(alunoService, 'addAlunoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        expect(alunoService.query).toHaveBeenCalled();
        expect(alunoService.addAlunoToCollectionIfMissing).toHaveBeenCalledWith(alunoCollection, ...additionalAlunos);
        expect(comp.alunosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const matricula: IMatricula = { id: 456 };
        const turmaMatricula: ITurma = { id: 16171 };
        matricula.turmaMatricula = turmaMatricula;
        const alunoMatricula: IAluno = { id: 2963 };
        matricula.alunoMatricula = alunoMatricula;

        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(matricula));
        expect(comp.turmasSharedCollection).toContain(turmaMatricula);
        expect(comp.alunosSharedCollection).toContain(alunoMatricula);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const matricula = { id: 123 };
        spyOn(matriculaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: matricula }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(matriculaService.update).toHaveBeenCalledWith(matricula);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const matricula = new Matricula();
        spyOn(matriculaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: matricula }));
        saveSubject.complete();

        // THEN
        expect(matriculaService.create).toHaveBeenCalledWith(matricula);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const matricula = { id: 123 };
        spyOn(matriculaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ matricula });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(matriculaService.update).toHaveBeenCalledWith(matricula);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTurmaById', () => {
        it('Should return tracked Turma primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTurmaById(0, entity);
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
