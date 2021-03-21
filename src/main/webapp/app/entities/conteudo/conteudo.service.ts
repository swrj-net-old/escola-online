import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConteudo } from 'app/shared/model/conteudo.model';

type EntityResponseType = HttpResponse<IConteudo>;
type EntityArrayResponseType = HttpResponse<IConteudo[]>;

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  public resourceUrl = SERVER_API_URL + 'api/conteudos';

  constructor(protected http: HttpClient) {}

  create(conteudo: IConteudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conteudo);
    return this.http
      .post<IConteudo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conteudo: IConteudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conteudo);
    return this.http
      .put<IConteudo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConteudo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(conteudo: IConteudo): IConteudo {
    const copy: IConteudo = Object.assign({}, conteudo, {
      dataAula: conteudo.dataAula && conteudo.dataAula.isValid() ? conteudo.dataAula.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataAula = res.body.dataAula ? moment(res.body.dataAula) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((conteudo: IConteudo) => {
        conteudo.dataAula = conteudo.dataAula ? moment(conteudo.dataAula) : undefined;
      });
    }
    return res;
  }
}
