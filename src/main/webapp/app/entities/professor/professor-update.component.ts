import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfessor, Professor } from 'app/shared/model/professor.model';
import { ProfessorService } from './professor.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IUnidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from 'app/entities/unidade/unidade.service';

type SelectableEntity = IPessoa | IUnidade;

@Component({
  selector: 'jhi-professor-update',
  templateUrl: './professor-update.component.html',
})
export class ProfessorUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];
  unidades: IUnidade[] = [];
  dataInicioDp: any;
  dataFimDp: any;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professor }) => {
      this.updateForm(professor);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));

      this.unidadeService.query().subscribe((res: HttpResponse<IUnidade[]>) => (this.unidades = res.body || []));
    });
  }

  updateForm(professor: IProfessor): void {
    this.editForm.patchValue({
      id: professor.id,
      anoLetivo: professor.anoLetivo,
      dataInicio: professor.dataInicio,
      dataFim: professor.dataFim,
      pessoaProfessor: professor.pessoaProfessor,
      unidadeProfessor: professor.unidadeProfessor,
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

  private createFromForm(): IProfessor {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
