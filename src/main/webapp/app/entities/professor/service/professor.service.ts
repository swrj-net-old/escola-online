import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProfessor, getProfessorIdentifier } from '../professor.model';

export type EntityResponseType = HttpResponse<IProfessor>;
export type EntityArrayResponseType = HttpResponse<IProfessor[]>;

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/professors');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .post<IProfessor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .put<IProfessor>(`${this.resourceUrl}/${getProfessorIdentifier(professor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(professor: IProfessor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professor);
    return this.http
      .patch<IProfessor>(`${this.resourceUrl}/${getProfessorIdentifier(professor) as number}`, copy, { observe: 'response' })
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

  addProfessorToCollectionIfMissing(
    professorCollection: IProfessor[],
    ...professorsToCheck: (IProfessor | null | undefined)[]
  ): IProfessor[] {
    const professors: IProfessor[] = professorsToCheck.filter(isPresent);
    if (professors.length > 0) {
      const professorCollectionIdentifiers = professorCollection.map(professorItem => getProfessorIdentifier(professorItem)!);
      const professorsToAdd = professors.filter(professorItem => {
        const professorIdentifier = getProfessorIdentifier(professorItem);
        if (professorIdentifier == null || professorCollectionIdentifiers.includes(professorIdentifier)) {
          return false;
        }
        professorCollectionIdentifiers.push(professorIdentifier);
        return true;
      });
      return [...professorsToAdd, ...professorCollection];
    }
    return professorCollection;
  }

  protected convertDateFromClient(professor: IProfessor): IProfessor {
    return Object.assign({}, professor, {
      dataInicio: professor.dataInicio?.isValid() ? professor.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: professor.dataFim?.isValid() ? professor.dataFim.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataInicio = res.body.dataInicio ? dayjs(res.body.dataInicio) : undefined;
      res.body.dataFim = res.body.dataFim ? dayjs(res.body.dataFim) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((professor: IProfessor) => {
        professor.dataInicio = professor.dataInicio ? dayjs(professor.dataInicio) : undefined;
        professor.dataFim = professor.dataFim ? dayjs(professor.dataFim) : undefined;
      });
    }
    return res;
  }
}
