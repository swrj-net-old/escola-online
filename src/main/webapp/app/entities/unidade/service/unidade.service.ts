import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUnidade, getUnidadeIdentifier } from '../unidade.model';

export type EntityResponseType = HttpResponse<IUnidade>;
export type EntityArrayResponseType = HttpResponse<IUnidade[]>;

@Injectable({ providedIn: 'root' })
export class UnidadeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/unidades');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(unidade: IUnidade): Observable<EntityResponseType> {
    return this.http.post<IUnidade>(this.resourceUrl, unidade, { observe: 'response' });
  }

  update(unidade: IUnidade): Observable<EntityResponseType> {
    return this.http.put<IUnidade>(`${this.resourceUrl}/${getUnidadeIdentifier(unidade) as number}`, unidade, { observe: 'response' });
  }

  partialUpdate(unidade: IUnidade): Observable<EntityResponseType> {
    return this.http.patch<IUnidade>(`${this.resourceUrl}/${getUnidadeIdentifier(unidade) as number}`, unidade, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnidade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnidade[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUnidadeToCollectionIfMissing(unidadeCollection: IUnidade[], ...unidadesToCheck: (IUnidade | null | undefined)[]): IUnidade[] {
    const unidades: IUnidade[] = unidadesToCheck.filter(isPresent);
    if (unidades.length > 0) {
      const unidadeCollectionIdentifiers = unidadeCollection.map(unidadeItem => getUnidadeIdentifier(unidadeItem)!);
      const unidadesToAdd = unidades.filter(unidadeItem => {
        const unidadeIdentifier = getUnidadeIdentifier(unidadeItem);
        if (unidadeIdentifier == null || unidadeCollectionIdentifiers.includes(unidadeIdentifier)) {
          return false;
        }
        unidadeCollectionIdentifiers.push(unidadeIdentifier);
        return true;
      });
      return [...unidadesToAdd, ...unidadeCollection];
    }
    return unidadeCollection;
  }
}
