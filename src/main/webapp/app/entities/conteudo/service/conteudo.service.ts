import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConteudo, getConteudoIdentifier } from '../conteudo.model';

export type EntityResponseType = HttpResponse<IConteudo>;
export type EntityArrayResponseType = HttpResponse<IConteudo[]>;

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/conteudos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(conteudo: IConteudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conteudo);
    return this.http
      .post<IConteudo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conteudo: IConteudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conteudo);
    return this.http
      .put<IConteudo>(`${this.resourceUrl}/${getConteudoIdentifier(conteudo) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(conteudo: IConteudo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conteudo);
    return this.http
      .patch<IConteudo>(`${this.resourceUrl}/${getConteudoIdentifier(conteudo) as number}`, copy, { observe: 'response' })
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

  addConteudoToCollectionIfMissing(conteudoCollection: IConteudo[], ...conteudosToCheck: (IConteudo | null | undefined)[]): IConteudo[] {
    const conteudos: IConteudo[] = conteudosToCheck.filter(isPresent);
    if (conteudos.length > 0) {
      const conteudoCollectionIdentifiers = conteudoCollection.map(conteudoItem => getConteudoIdentifier(conteudoItem)!);
      const conteudosToAdd = conteudos.filter(conteudoItem => {
        const conteudoIdentifier = getConteudoIdentifier(conteudoItem);
        if (conteudoIdentifier == null || conteudoCollectionIdentifiers.includes(conteudoIdentifier)) {
          return false;
        }
        conteudoCollectionIdentifiers.push(conteudoIdentifier);
        return true;
      });
      return [...conteudosToAdd, ...conteudoCollection];
    }
    return conteudoCollection;
  }

  protected convertDateFromClient(conteudo: IConteudo): IConteudo {
    return Object.assign({}, conteudo, {
      dataAula: conteudo.dataAula?.isValid() ? conteudo.dataAula.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((conteudo: IConteudo) => {
        conteudo.dataAula = conteudo.dataAula ? dayjs(conteudo.dataAula) : undefined;
      });
    }
    return res;
  }
}
