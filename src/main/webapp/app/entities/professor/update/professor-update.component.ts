import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProfessor, Professor } from '../professor.model';
import { ProfessorService } from '../service/professor.service';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

@Component({
  selector: 'jhi-professor-update',
  templateUrl: './professor-update.component.html',
})
export class ProfessorUpdateComponent implements OnInit {
  isSaving = false;

  pessoasSharedCollection: IPessoa[] = [];
  unidadesSharedCollection: IUnidade[] = [];

  editForm = this.fb.group({
    id: [],
    anoLetivo: [],
    dataInicio: [],
    dataFim: [],
    pessoaProfessor: [],
    unidadeProfessor: [],
  });

  constructor(
    protected professorService: ProfessorService,
    protected pessoaService: PessoaService,
    protected unidadeService: UnidadeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professor }) => {
      this.updateForm(professor);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professor = this.createFromForm();
    if (professor.id !== undefined) {
      this.subscribeToSaveResponse(this.professorService.update(professor));
    } else {
      this.subscribeToSaveResponse(this.professorService.create(professor));
    }
  }

  trackPessoaById(index: number, item: IPessoa): number {
    return item.id!;
  }

  trackUnidadeById(index: number, item: IUnidade): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(professor: IProfessor): void {
    this.editForm.patchValue({
      id: professor.id,
      anoLetivo: professor.anoLetivo,
      dataInicio: professor.dataInicio,
      dataFim: professor.dataFim,
      pessoaProfessor: professor.pessoaProfessor,
      unidadeProfessor: professor.unidadeProfessor,
    });

    this.pessoasSharedCollection = this.pessoaService.addPessoaToCollectionIfMissing(
      this.pessoasSharedCollection,
      professor.pessoaProfessor
    );
    this.unidadesSharedCollection = this.unidadeService.addUnidadeToCollectionIfMissing(
      this.unidadesSharedCollection,
      professor.unidadeProfessor
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pessoaService
      .query()
      .pipe(map((res: HttpResponse<IPessoa[]>) => res.body ?? []))
      .pipe(
        map((pessoas: IPessoa[]) => this.pessoaService.addPessoaToCollectionIfMissing(pessoas, this.editForm.get('pessoaProfessor')!.value))
      )
      .subscribe((pessoas: IPessoa[]) => (this.pessoasSharedCollection = pessoas));

    this.unidadeService
      .query()
      .pipe(map((res: HttpResponse<IUnidade[]>) => res.body ?? []))
      .pipe(
        map((unidades: IUnidade[]) =>
          this.unidadeService.addUnidadeToCollectionIfMissing(unidades, this.editForm.get('unidadeProfessor')!.value)
        )
      )
      .subscribe((unidades: IUnidade[]) => (this.unidadesSharedCollection = unidades));
  }

  protected createFromForm(): IProfessor {
    return {
      ...new Professor(),
      id: this.editForm.get(['id'])!.value,
      anoLetivo: this.editForm.get(['anoLetivo'])!.value,
      dataInicio: this.editForm.get(['dataInicio'])!.value,
      dataFim: this.editForm.get(['dataFim'])!.value,
      pessoaProfessor: this.editForm.get(['pessoaProfessor'])!.value,
      unidadeProfessor: this.editForm.get(['unidadeProfessor'])!.value,
    };
  }
}
