import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiretor, Diretor } from 'app/shared/model/diretor.model';
import { DiretorService } from './diretor.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IUnidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from 'app/entities/unidade/unidade.service';

type SelectableEntity = IPessoa | IUnidade;

@Component({
  selector: 'jhi-diretor-update',
  templateUrl: './diretor-update.component.html',
})
export class DiretorUpdateComponent implements OnInit {
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
    pessoaDiretor: [],
    unidadeDiretor: [],
  });

  constructor(
    protected diretorService: DiretorService,
    protected pessoaService: PessoaService,
    protected unidadeService: UnidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diretor }) => {
      this.updateForm(diretor);

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));

      this.unidadeService.query().subscribe((res: HttpResponse<IUnidade[]>) => (this.unidades = res.body || []));
    });
  }

  updateForm(diretor: IDiretor): void {
    this.editForm.patchValue({
      id: diretor.id,
      anoLetivo: diretor.anoLetivo,
      dataInicio: diretor.dataInicio,
      dataFim: diretor.dataFim,
      pessoaDiretor: diretor.pessoaDiretor,
      unidadeDiretor: diretor.unidadeDiretor,
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

  private createFromForm(): IDiretor {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiretor>>): void {
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
