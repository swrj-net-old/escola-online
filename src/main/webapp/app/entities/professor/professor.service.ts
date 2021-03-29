import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfessor } from 'app/shared/model/professor.model';

type EntityResponseType = HttpResponse<IProfessor>;
type EntityArrayResponseType = HttpResponse<IProfessor[]>;

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  public resourceUrl = SERVER_API_URL + 'api/professors';

  constructor(protected http: HttpClient) {}

  create(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .post<IProfessor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .put<IProfessor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(professor: IProfessor): IProfessor {
    const copy: IProfessor = Object.assign({}, professor, {
      dataInicio: professor.dataInicio && professor.dataInicio.isValid() ? professor.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: professor.dataFim && professor.dataFim.isValid() ? professor.dataFim.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((professor: IProfessor) => {
        professor.dataInicio = professor.dataInicio ? moment(professor.dataInicio) : undefined;
        professor.dataFim = professor.dataFim ? moment(professor.dataFim) : undefined;
      });
    }
    return res;
  }
}
