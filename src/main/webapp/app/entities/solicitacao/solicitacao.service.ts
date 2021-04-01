import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';

type EntityResponseType = HttpResponse<ISolicitacao>;
type EntityArrayResponseType = HttpResponse<ISolicitacao[]>;

@Injectable({ providedIn: 'root' })
export class SolicitacaoService {
  public resourceUrl = SERVER_API_URL + 'api/solicitacaos';

  constructor(protected http: HttpClient) {}

  create(solicitacao: ISolicitacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solicitacao);
    return this.http
      .post<ISolicitacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(solicitacao: ISolicitacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solicitacao);
    return this.http
      .put<ISolicitacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISolicitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(solicitacao: ISolicitacao): ISolicitacao {
    const copy: ISolicitacao = Object.assign({}, solicitacao, {
      dataSolicitacao:
        solicitacao.dataSolicitacao && solicitacao.dataSolicitacao.isValid() ? solicitacao.dataSolicitacao.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataSolicitacao = res.body.dataSolicitacao ? moment(res.body.dataSolicitacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((solicitacao: ISolicitacao) => {
        solicitacao.dataSolicitacao = solicitacao.dataSolicitacao ? moment(solicitacao.dataSolicitacao) : undefined;
      });
    }
    return res;
  }
}
