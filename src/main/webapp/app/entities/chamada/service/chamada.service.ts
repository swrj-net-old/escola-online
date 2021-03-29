import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChamada, getChamadaIdentifier } from '../chamada.model';

export type EntityResponseType = HttpResponse<IChamada>;
export type EntityArrayResponseType = HttpResponse<IChamada[]>;

@Injectable({ providedIn: 'root' })
export class ChamadaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/chamadas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(chamada: IChamada): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chamada);
    return this.http
      .post<IChamada>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chamada: IChamada): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chamada);
    return this.http
      .put<IChamada>(`${this.resourceUrl}/${getChamadaIdentifier(chamada) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(chamada: IChamada): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chamada);
    return this.http
      .patch<IChamada>(`${this.resourceUrl}/${getChamadaIdentifier(chamada) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChamada>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChamada[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChamadaToCollectionIfMissing(chamadaCollection: IChamada[], ...chamadasToCheck: (IChamada | null | undefined)[]): IChamada[] {
    const chamadas: IChamada[] = chamadasToCheck.filter(isPresent);
    if (chamadas.length > 0) {
      const chamadaCollectionIdentifiers = chamadaCollection.map(chamadaItem => getChamadaIdentifier(chamadaItem)!);
      const chamadasToAdd = chamadas.filter(chamadaItem => {
        const chamadaIdentifier = getChamadaIdentifier(chamadaItem);
        if (chamadaIdentifier == null || chamadaCollectionIdentifiers.includes(chamadaIdentifier)) {
          return false;
        }
        chamadaCollectionIdentifiers.push(chamadaIdentifier);
        return true;
      });
      return [...chamadasToAdd, ...chamadaCollection];
    }
    return chamadaCollection;
  }

  protected convertDateFromClient(chamada: IChamada): IChamada {
    return Object.assign({}, chamada, {
      dataAula: chamada.dataAula?.isValid() ? chamada.dataAula.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataAula = res.body.dataAula ? dayjs(res.body.dataAula) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chamada: IChamada) => {
        chamada.dataAula = chamada.dataAula ? dayjs(chamada.dataAula) : undefined;
      });
    }
    return res;
  }
}
