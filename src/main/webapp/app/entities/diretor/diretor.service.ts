import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiretor } from 'app/shared/model/diretor.model';

type EntityResponseType = HttpResponse<IDiretor>;
type EntityArrayResponseType = HttpResponse<IDiretor[]>;

@Injectable({ providedIn: 'root' })
export class DiretorService {
  public resourceUrl = SERVER_API_URL + 'api/diretors';

  constructor(protected http: HttpClient) {}

  create(diretor: IDiretor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diretor);
    return this.http
      .post<IDiretor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(diretor: IDiretor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diretor);
    return this.http
      .put<IDiretor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiretor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiretor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(diretor: IDiretor): IDiretor {
    const copy: IDiretor = Object.assign({}, diretor, {
      dataInicio: diretor.dataInicio && diretor.dataInicio.isValid() ? diretor.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: diretor.dataFim && diretor.dataFim.isValid() ? diretor.dataFim.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataInicio = res.body.dataInicio ? moment(res.body.dataInicio) : undefined;
      res.body.dataFim = res.body.dataFim ? moment(res.body.dataFim) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((diretor: IDiretor) => {
        diretor.dataInicio = diretor.dataInicio ? moment(diretor.dataInicio) : undefined;
        diretor.dataFim = diretor.dataFim ? moment(diretor.dataFim) : undefined;
      });
    }
    return res;
  }
}
