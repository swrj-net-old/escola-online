import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEscola, getEscolaIdentifier } from '../escola.model';

export type EntityResponseType = HttpResponse<IEscola>;
export type EntityArrayResponseType = HttpResponse<IEscola[]>;

@Injectable({ providedIn: 'root' })
export class EscolaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/escolas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(escola: IEscola): Observable<EntityResponseType> {
    return this.http.post<IEscola>(this.resourceUrl, escola, { observe: 'response' });
  }

  update(escola: IEscola): Observable<EntityResponseType> {
    return this.http.put<IEscola>(`${this.resourceUrl}/${getEscolaIdentifier(escola) as number}`, escola, { observe: 'response' });
  }

  partialUpdate(escola: IEscola): Observable<EntityResponseType> {
    return this.http.patch<IEscola>(`${this.resourceUrl}/${getEscolaIdentifier(escola) as number}`, escola, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEscola>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEscola[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEscolaToCollectionIfMissing(escolaCollection: IEscola[], ...escolasToCheck: (IEscola | null | undefined)[]): IEscola[] {
    const escolas: IEscola[] = escolasToCheck.filter(isPresent);
    if (escolas.length > 0) {
      const escolaCollectionIdentifiers = escolaCollection.map(escolaItem => getEscolaIdentifier(escolaItem)!);
      const escolasToAdd = escolas.filter(escolaItem => {
        const escolaIdentifier = getEscolaIdentifier(escolaItem);
        if (escolaIdentifier == null || escolaCollectionIdentifiers.includes(escolaIdentifier)) {
          return false;
        }
        escolaCollectionIdentifiers.push(escolaIdentifier);
        return true;
      });
      return [...escolasToAdd, ...escolaCollection];
    }
    return escolaCollection;
  }
}
