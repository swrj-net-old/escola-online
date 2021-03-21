import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDebito } from 'app/shared/model/debito.model';

type EntityResponseType = HttpResponse<IDebito>;
type EntityArrayResponseType = HttpResponse<IDebito[]>;

@Injectable({ providedIn: 'root' })
export class DebitoService {
  public resourceUrl = SERVER_API_URL + 'api/debitos';

  constructor(protected http: HttpClient) {}

  create(debito: IDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(debito);
    return this.http
      .post<IDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(debito: IDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(debito);
    return this.http
      .put<IDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDebito>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDebito[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(debito: IDebito): IDebito {
    const copy: IDebito = Object.assign({}, debito, {
      dataVencimento: debito.dataVencimento && debito.dataVencimento.isValid() ? debito.dataVencimento.format(DATE_FORMAT) : undefined,
      dataPagamento: debito.dataPagamento && debito.dataPagamento.isValid() ? debito.dataPagamento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataVencimento = res.body.dataVencimento ? moment(res.body.dataVencimento) : undefined;
      res.body.dataPagamento = res.body.dataPagamento ? moment(res.body.dataPagamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((debito: IDebito) => {
        debito.dataVencimento = debito.dataVencimento ? moment(debito.dataVencimento) : undefined;
        debito.dataPagamento = debito.dataPagamento ? moment(debito.dataPagamento) : undefined;
      });
    }
    return res;
  }
}
