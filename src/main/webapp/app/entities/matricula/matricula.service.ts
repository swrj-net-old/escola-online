import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMatricula } from 'app/shared/model/matricula.model';

type EntityResponseType = HttpResponse<IMatricula>;
type EntityArrayResponseType = HttpResponse<IMatricula[]>;

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  public resourceUrl = SERVER_API_URL + 'api/matriculas';

  constructor(protected http: HttpClient) {}

  create(matricula: IMatricula): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(matricula);
    return this.http
      .post<IMatricula>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(matricula: IMatricula): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(matricula);
    return this.http
      .put<IMatricula>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMatricula>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMatricula[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(matricula: IMatricula): IMatricula {
    const copy: IMatricula = Object.assign({}, matricula, {
      dataInicio: matricula.dataInicio && matricula.dataInicio.isValid() ? matricula.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: matricula.dataFim && matricula.dataFim.isValid() ? matricula.dataFim.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((matricula: IMatricula) => {
        matricula.dataInicio = matricula.dataInicio ? moment(matricula.dataInicio) : undefined;
        matricula.dataFim = matricula.dataFim ? moment(matricula.dataFim) : undefined;
      });
    }
    return res;
  }
}
