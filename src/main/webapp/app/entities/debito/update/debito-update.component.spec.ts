jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DebitoService } from '../service/debito.service';
import { IDebito, Debito } from '../debito.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { AlunoService } from 'app/entities/aluno/service/aluno.service';

import { DebitoUpdateComponent } from './debito-update.component';

describe('Component Tests', () => {
  describe('Debito Management Update Component', () => {
    let comp: DebitoUpdateComponent;
    let fixture: ComponentFixture<DebitoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let debitoService: DebitoService;
    let alunoService: AlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DebitoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DebitoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DebitoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      debitoService = TestBed.inject(DebitoService);
      alunoService = TestBed.inject(AlunoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Aluno query and add missing value', () => {
        const debito: IDebito = { id: 456 };
        const alunoDebito: IAluno = { id: 45155 };
        debito.alunoDebito = alunoDebito;

        const alunoCollection: IAluno[] = [{ id: 47853 }];
        spyOn(alunoService, 'query').and.returnValue(of(new HttpResponse({ body: alunoCollection })));
        const additionalAlunos = [alunoDebito];
        const expectedCollection: IAluno[] = [...additionalAlunos, ...alunoCollection];
        spyOn(alunoService, 'addAlunoToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ debito });
        comp.ngOnInit();

        expect(alunoService.query).toHaveBeenCalled();
        expect(alunoService.addAlunoToCollectionIfMissing).toHaveBeenCalledWith(alunoCollection, ...additionalAlunos);
        expect(comp.alunosSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const debito: IDebito = { id: 456 };
        const alunoDebito: IAluno = { id: 44930 };
        debito.alunoDebito = alunoDebito;

        activatedRoute.data = of({ debito });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(debito));
        expect(comp.alunosSharedCollection).toContain(alunoDebito);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const debito = { id: 123 };
        spyOn(debitoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ debito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: debito }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(debitoService.update).toHaveBeenCalledWith(debito);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const debito = new Debito();
        spyOn(debitoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ debito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: debito }));
        saveSubject.complete();

        // THEN
        expect(debitoService.create).toHaveBeenCalledWith(debito);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const debito = { id: 123 };
        spyOn(debitoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ debito });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(debitoService.update).toHaveBeenCalledWith(debito);
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
    });
  });
});
