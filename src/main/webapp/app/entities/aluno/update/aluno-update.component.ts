import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAluno, Aluno } from '../aluno.model';
import { AlunoService } from '../service/aluno.service';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IEscola } from 'app/entities/escola/escola.model';
import { EscolaService } from 'app/entities/escola/service/escola.service';

@Component({
  selector: 'jhi-aluno-update',
  templateUrl: './aluno-update.component.html',
})
export class AlunoUpdateComponent implements OnInit {
  isSaving = false;

  pessoasSharedCollection: IPessoa[] = [];
  escolasSharedCollection: IEscola[] = [];

  editForm = this.fb.group({
    id: [],
    dataNascimento: [],
    tipoSanguineo: [],
    nomePai: [],
    telefonePai: [],
    nomeMae: [],
    telefoneMae: [],
    nomeResponsavel: [],
    cpfResponsavel: [],
    observacoes: [],
    pessoaAluno: [],
    escolaAluno: [],
  });

  constructor(
    protected alunoService: AlunoService,
    protected pessoaService: PessoaService,
    protected escolaService: EscolaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aluno }) => {
      this.updateForm(aluno);

      this.loadRelationshipsOptions();
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

  trackPessoaById(index: number, item: IPessoa): number {
    return item.id!;
  }

  trackEscolaById(index: number, item: IEscola): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAluno>>): void {
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

  protected updateForm(aluno: IAluno): void {
    this.editForm.patchValue({
      id: aluno.id,
      dataNascimento: aluno.dataNascimento,
      tipoSanguineo: aluno.tipoSanguineo,
      nomePai: aluno.nomePai,
      telefonePai: aluno.telefonePai,
      nomeMae: aluno.nomeMae,
      telefoneMae: aluno.telefoneMae,
      nomeResponsavel: aluno.nomeResponsavel,
      cpfResponsavel: aluno.cpfResponsavel,
      observacoes: aluno.observacoes,
      pessoaAluno: aluno.pessoaAluno,
      escolaAluno: aluno.escolaAluno,
    });

    this.pessoasSharedCollection = this.pessoaService.addPessoaToCollectionIfMissing(this.pessoasSharedCollection, aluno.pessoaAluno);
    this.escolasSharedCollection = this.escolaService.addEscolaToCollectionIfMissing(this.escolasSharedCollection, aluno.escolaAluno);
  }

  protected loadRelationshipsOptions(): void {
    this.pessoaService
      .query()
      .pipe(map((res: HttpResponse<IPessoa[]>) => res.body ?? []))
      .pipe(
        map((pessoas: IPessoa[]) => this.pessoaService.addPessoaToCollectionIfMissing(pessoas, this.editForm.get('pessoaAluno')!.value))
      )
      .subscribe((pessoas: IPessoa[]) => (this.pessoasSharedCollection = pessoas));

    this.escolaService
      .query()
      .pipe(map((res: HttpResponse<IEscola[]>) => res.body ?? []))
      .pipe(
        map((escolas: IEscola[]) => this.escolaService.addEscolaToCollectionIfMissing(escolas, this.editForm.get('escolaAluno')!.value))
      )
      .subscribe((escolas: IEscola[]) => (this.escolasSharedCollection = escolas));
  }

  protected createFromForm(): IAluno {
    return {
      ...new Aluno(),
      id: this.editForm.get(['id'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      tipoSanguineo: this.editForm.get(['tipoSanguineo'])!.value,
      nomePai: this.editForm.get(['nomePai'])!.value,
      telefonePai: this.editForm.get(['telefonePai'])!.value,
      nomeMae: this.editForm.get(['nomeMae'])!.value,
      telefoneMae: this.editForm.get(['telefoneMae'])!.value,
      nomeResponsavel: this.editForm.get(['nomeResponsavel'])!.value,
      cpfResponsavel: this.editForm.get(['cpfResponsavel'])!.value,
      observacoes: this.editForm.get(['observacoes'])!.value,
      pessoaAluno: this.editForm.get(['pessoaAluno'])!.value,
      escolaAluno: this.editForm.get(['escolaAluno'])!.value,
    };
  }
}
