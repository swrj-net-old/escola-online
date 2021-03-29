import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';

type EntityResponseType = HttpResponse<IHistoricoDebito>;
type EntityArrayResponseType = HttpResponse<IHistoricoDebito[]>;

@Injectable({ providedIn: 'root' })
export class HistoricoDebitoService {
  public resourceUrl = SERVER_API_URL + 'api/historico-debitos';

  constructor(protected http: HttpClient) {}

  create(historicoDebito: IHistoricoDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoDebito);
    return this.http
      .post<IHistoricoDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historicoDebito: IHistoricoDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoDebito);
    return this.http
      .put<IHistoricoDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoricoDebito>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoricoDebito[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historicoDebito: IHistoricoDebito): IHistoricoDebito {
    const copy: IHistoricoDebito = Object.assign({}, historicoDebito, {
      dataLancamento:
        historicoDebito.dataLancamento && historicoDebito.dataLancamento.isValid()
          ? historicoDebito.dataLancamento.format(DATE_FORMAT)
          : undefined,
      dataVencimento:
        historicoDebito.dataVencimento && historicoDebito.dataVencimento.isValid()
          ? historicoDebito.dataVencimento.format(DATE_FORMAT)
          : undefined,
      dataPagamento:
        historicoDebito.dataPagamento && historicoDebito.dataPagamento.isValid()
          ? historicoDebito.dataPagamento.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataLancamento = res.body.dataLancamento ? moment(res.body.dataLancamento) : undefined;
      res.body.dataVencimento = res.body.dataVencimento ? moment(res.body.dataVencimento) : undefined;
      res.body.dataPagamento = res.body.dataPagamento ? moment(res.body.dataPagamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historicoDebito: IHistoricoDebito) => {
        historicoDebito.dataLancamento = historicoDebito.dataLancamento ? moment(historicoDebito.dataLancamento) : undefined;
        historicoDebito.dataVencimento = historicoDebito.dataVencimento ? moment(historicoDebito.dataVencimento) : undefined;
        historicoDebito.dataPagamento = historicoDebito.dataPagamento ? moment(historicoDebito.dataPagamento) : undefined;
      });
    }
    return res;
  }
}
