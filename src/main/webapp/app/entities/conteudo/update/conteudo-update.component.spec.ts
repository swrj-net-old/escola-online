jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ConteudoService } from '../service/conteudo.service';
import { IConteudo, Conteudo } from '../conteudo.model';
import { ITurma } from 'app/entities/turma/turma.model';
import { TurmaService } from 'app/entities/turma/service/turma.service';
import { IProfessor } from 'app/entities/professor/professor.model';
import { ProfessorService } from 'app/entities/professor/service/professor.service';
import { IMateria } from 'app/entities/materia/materia.model';
import { MateriaService } from 'app/entities/materia/service/materia.service';

import { ConteudoUpdateComponent } from './conteudo-update.component';

describe('Component Tests', () => {
  describe('Conteudo Management Update Component', () => {
    let comp: ConteudoUpdateComponent;
    let fixture: ComponentFixture<ConteudoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let conteudoService: ConteudoService;
    let turmaService: TurmaService;
    let professorService: ProfessorService;
    let materiaService: MateriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ConteudoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ConteudoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConteudoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      conteudoService = TestBed.inject(ConteudoService);
      turmaService = TestBed.inject(TurmaService);
      professorService = TestBed.inject(ProfessorService);
      materiaService = TestBed.inject(MateriaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Turma query and add missing value', () => {
        const conteudo: IConteudo = { id: 456 };
        const turmaConteudo: ITurma = { id: 47834 };
        conteudo.turmaConteudo = turmaConteudo;

        const turmaCollection: ITurma[] = [{ id: 42045 }];
        spyOn(turmaService, 'query').and.returnValue(of(new HttpResponse({ body: turmaCollection })));
        const additionalTurmas = [turmaConteudo];
        const expectedCollection: ITurma[] = [...additionalTurmas, ...turmaCollection];
        spyOn(turmaService, 'addTurmaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        expect(turmaService.query).toHaveBeenCalled();
        expect(turmaService.addTurmaToCollectionIfMissing).toHaveBeenCalledWith(turmaCollection, ...additionalTurmas);
        expect(comp.turmasSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Professor query and add missing value', () => {
        const conteudo: IConteudo = { id: 456 };
        const professorConteudo: IProfessor = { id: 70983 };
        conteudo.professorConteudo = professorConteudo;

        const professorCollection: IProfessor[] = [{ id: 26031 }];
        spyOn(professorService, 'query').and.returnValue(of(new HttpResponse({ body: professorCollection })));
        const additionalProfessors = [professorConteudo];
        const expectedCollection: IProfessor[] = [...additionalProfessors, ...professorCollection];
        spyOn(professorService, 'addProfessorToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        expect(professorService.query).toHaveBeenCalled();
        expect(professorService.addProfessorToCollectionIfMissing).toHaveBeenCalledWith(professorCollection, ...additionalProfessors);
        expect(comp.professorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Materia query and add missing value', () => {
        const conteudo: IConteudo = { id: 456 };
        const materiaConteudo: IMateria = { id: 79946 };
        conteudo.materiaConteudo = materiaConteudo;

        const materiaCollection: IMateria[] = [{ id: 46629 }];
        spyOn(materiaService, 'query').and.returnValue(of(new HttpResponse({ body: materiaCollection })));
        const additionalMaterias = [materiaConteudo];
        const expectedCollection: IMateria[] = [...additionalMaterias, ...materiaCollection];
        spyOn(materiaService, 'addMateriaToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        expect(materiaService.query).toHaveBeenCalled();
        expect(materiaService.addMateriaToCollectionIfMissing).toHaveBeenCalledWith(materiaCollection, ...additionalMaterias);
        expect(comp.materiasSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const conteudo: IConteudo = { id: 456 };
        const turmaConteudo: ITurma = { id: 34180 };
        conteudo.turmaConteudo = turmaConteudo;
        const professorConteudo: IProfessor = { id: 91118 };
        conteudo.professorConteudo = professorConteudo;
        const materiaConteudo: IMateria = { id: 31689 };
        conteudo.materiaConteudo = materiaConteudo;

        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(conteudo));
        expect(comp.turmasSharedCollection).toContain(turmaConteudo);
        expect(comp.professorsSharedCollection).toContain(professorConteudo);
        expect(comp.materiasSharedCollection).toContain(materiaConteudo);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const conteudo = { id: 123 };
        spyOn(conteudoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: conteudo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(conteudoService.update).toHaveBeenCalledWith(conteudo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const conteudo = new Conteudo();
        spyOn(conteudoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: conteudo }));
        saveSubject.complete();

        // THEN
        expect(conteudoService.create).toHaveBeenCalledWith(conteudo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const conteudo = { id: 123 };
        spyOn(conteudoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ conteudo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(conteudoService.update).toHaveBeenCalledWith(conteudo);
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

      describe('trackProfessorById', () => {
        it('Should return tracked Professor primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProfessorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMateriaById', () => {
        it('Should return tracked Materia primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMateriaById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
