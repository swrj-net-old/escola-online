import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDiretor, getDiretorIdentifier } from '../diretor.model';

export type EntityResponseType = HttpResponse<IDiretor>;
export type EntityArrayResponseType = HttpResponse<IDiretor[]>;

@Injectable({ providedIn: 'root' })
export class DiretorService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/diretors');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(diretor: IDiretor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diretor);
    return this.http
      .post<IDiretor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(diretor: IDiretor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diretor);
    return this.http
      .put<IDiretor>(`${this.resourceUrl}/${getDiretorIdentifier(diretor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(diretor: IDiretor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diretor);
    return this.http
      .patch<IDiretor>(`${this.resourceUrl}/${getDiretorIdentifier(diretor) as number}`, copy, { observe: 'response' })
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

  addDiretorToCollectionIfMissing(diretorCollection: IDiretor[], ...diretorsToCheck: (IDiretor | null | undefined)[]): IDiretor[] {
    const diretors: IDiretor[] = diretorsToCheck.filter(isPresent);
    if (diretors.length > 0) {
      const diretorCollectionIdentifiers = diretorCollection.map(diretorItem => getDiretorIdentifier(diretorItem)!);
      const diretorsToAdd = diretors.filter(diretorItem => {
        const diretorIdentifier = getDiretorIdentifier(diretorItem);
        if (diretorIdentifier == null || diretorCollectionIdentifiers.includes(diretorIdentifier)) {
          return false;
        }
        diretorCollectionIdentifiers.push(diretorIdentifier);
        return true;
      });
      return [...diretorsToAdd, ...diretorCollection];
    }
    return diretorCollection;
  }

  protected convertDateFromClient(diretor: IDiretor): IDiretor {
    return Object.assign({}, diretor, {
      dataInicio: diretor.dataInicio?.isValid() ? diretor.dataInicio.format(DATE_FORMAT) : undefined,
      dataFim: diretor.dataFim?.isValid() ? diretor.dataFim.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((diretor: IDiretor) => {
        diretor.dataInicio = diretor.dataInicio ? dayjs(diretor.dataInicio) : undefined;
        diretor.dataFim = diretor.dataFim ? dayjs(diretor.dataFim) : undefined;
      });
    }
    return res;
  }
}
