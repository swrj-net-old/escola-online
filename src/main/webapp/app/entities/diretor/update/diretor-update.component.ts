import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDiretor, Diretor } from '../diretor.model';
import { DiretorService } from '../service/diretor.service';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IUnidade } from 'app/entities/unidade/unidade.model';
import { UnidadeService } from 'app/entities/unidade/service/unidade.service';

@Component({
  selector: 'jhi-diretor-update',
  templateUrl: './diretor-update.component.html',
})
export class DiretorUpdateComponent implements OnInit {
  isSaving = false;

  pessoasSharedCollection: IPessoa[] = [];
  unidadesSharedCollection: IUnidade[] = [];

  editForm = this.fb.group({
    id: [],
    anoLetivo: [],
    dataInicio: [],
    dataFim: [],
    pessoaDiretor: [],
    unidadeDiretor: [],
  });

  constructor(
    protected diretorService: DiretorService,
    protected pessoaService: PessoaService,
    protected unidadeService: UnidadeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diretor }) => {
      this.updateForm(diretor);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diretor = this.createFromForm();
    if (diretor.id !== undefined) {
      this.subscribeToSaveResponse(this.diretorService.update(diretor));
    } else {
      this.subscribeToSaveResponse(this.diretorService.create(diretor));
    }
  }

  trackPessoaById(index: number, item: IPessoa): number {
    return item.id!;
  }

  trackUnidadeById(index: number, item: IUnidade): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiretor>>): void {
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

  protected updateForm(diretor: IDiretor): void {
    this.editForm.patchValue({
      id: diretor.id,
      anoLetivo: diretor.anoLetivo,
      dataInicio: diretor.dataInicio,
      dataFim: diretor.dataFim,
      pessoaDiretor: diretor.pessoaDiretor,
      unidadeDiretor: diretor.unidadeDiretor,
    });

    this.pessoasSharedCollection = this.pessoaService.addPessoaToCollectionIfMissing(this.pessoasSharedCollection, diretor.pessoaDiretor);
    this.unidadesSharedCollection = this.unidadeService.addUnidadeToCollectionIfMissing(
      this.unidadesSharedCollection,
      diretor.unidadeDiretor
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pessoaService
      .query()
      .pipe(map((res: HttpResponse<IPessoa[]>) => res.body ?? []))
      .pipe(
        map((pessoas: IPessoa[]) => this.pessoaService.addPessoaToCollectionIfMissing(pessoas, this.editForm.get('pessoaDiretor')!.value))
      )
      .subscribe((pessoas: IPessoa[]) => (this.pessoasSharedCollection = pessoas));

    this.unidadeService
      .query()
      .pipe(map((res: HttpResponse<IUnidade[]>) => res.body ?? []))
      .pipe(
        map((unidades: IUnidade[]) =>
          this.unidadeService.addUnidadeToCollectionIfMissing(unidades, this.editForm.get('unidadeDiretor')!.value)
        )
      )
      .subscribe((unidades: IUnidade[]) => (this.unidadesSharedCollection = unidades));
  }

  protected createFromForm(): IDiretor {
    return {
      ...new Diretor(),
      id: this.editForm.get(['id'])!.value,
      anoLetivo: this.editForm.get(['anoLetivo'])!.value,
      dataInicio: this.editForm.get(['dataInicio'])!.value,
      dataFim: this.editForm.get(['dataFim'])!.value,
      pessoaDiretor: this.editForm.get(['pessoaDiretor'])!.value,
      unidadeDiretor: this.editForm.get(['unidadeDiretor'])!.value,
    };
  }
}
