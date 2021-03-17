import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAluno, Aluno } from 'app/shared/model/aluno.model';
import { AlunoService } from './aluno.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IEscola } from 'app/shared/model/escola.model';
import { EscolaService } from 'app/entities/escola/escola.service';

type SelectableEntity = IPessoa | IEscola;

@Component({
  selector: 'jhi-aluno-update',
  templateUrl: './aluno-update.component.html',
})
export class AlunoUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];
  escolas: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    pessoaAluno: [],
    escolaAluno: [],
  });

  constructor(
    protected alunoService: AlunoService,
    protected pessoaService: PessoaService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aluno }) => {
      this.updateForm(aluno);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));

      this.escolaService.query().subscribe((res: HttpResponse<IEscola[]>) => (this.escolas = res.body || []));
    });
  }

  updateForm(aluno: IAluno): void {
    this.editForm.patchValue({
      id: aluno.id,
      pessoaAluno: aluno.pessoaAluno,
      escolaAluno: aluno.escolaAluno,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aluno = this.createFromForm();
    if (aluno.id !== undefined) {
      this.subscribeToSaveResponse(this.alunoService.update(aluno));
    } else {
      this.subscribeToSaveResponse(this.alunoService.create(aluno));
    }
  }

  private createFromForm(): IAluno {
    return {
      ...new Aluno(),
      id: this.editForm.get(['id'])!.value,
      pessoaAluno: this.editForm.get(['pessoaAluno'])!.value,
      escolaAluno: this.editForm.get(['escolaAluno'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAluno>>): void {
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
