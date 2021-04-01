import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAluno } from 'app/shared/model/aluno.model';

type EntityResponseType = HttpResponse<IAluno>;
type EntityArrayResponseType = HttpResponse<IAluno[]>;

@Injectable({ providedIn: 'root' })
export class AlunoService {
  public resourceUrl = SERVER_API_URL + 'api/alunos';

  constructor(protected http: HttpClient) {}

  create(aluno: IAluno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aluno);
    return this.http
      .post<IAluno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(aluno: IAluno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aluno);
    return this.http
      .put<IAluno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAluno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAluno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(aluno: IAluno): IAluno {
    const copy: IAluno = Object.assign({}, aluno, {
      dataNascimento: aluno.dataNascimento && aluno.dataNascimento.isValid() ? aluno.dataNascimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataNascimento = res.body.dataNascimento ? moment(res.body.dataNascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((aluno: IAluno) => {
        aluno.dataNascimento = aluno.dataNascimento ? moment(aluno.dataNascimento) : undefined;
      });
    }
    return res;
  }
}
