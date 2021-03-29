import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoSolicitacao, getTipoSolicitacaoIdentifier } from '../tipo-solicitacao.model';

export type EntityResponseType = HttpResponse<ITipoSolicitacao>;
export type EntityArrayResponseType = HttpResponse<ITipoSolicitacao[]>;

@Injectable({ providedIn: 'root' })
export class TipoSolicitacaoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-solicitacaos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(tipoSolicitacao: ITipoSolicitacao): Observable<EntityResponseType> {
    return this.http.post<ITipoSolicitacao>(this.resourceUrl, tipoSolicitacao, { observe: 'response' });
  }

  update(tipoSolicitacao: ITipoSolicitacao): Observable<EntityResponseType> {
    return this.http.put<ITipoSolicitacao>(
      `${this.resourceUrl}/${getTipoSolicitacaoIdentifier(tipoSolicitacao) as number}`,
      tipoSolicitacao,
      { observe: 'response' }
    );
  }

  partialUpdate(tipoSolicitacao: ITipoSolicitacao): Observable<EntityResponseType> {
    return this.http.patch<ITipoSolicitacao>(
      `${this.resourceUrl}/${getTipoSolicitacaoIdentifier(tipoSolicitacao) as number}`,
      tipoSolicitacao,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoSolicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoSolicitacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoSolicitacaoToCollectionIfMissing(
    tipoSolicitacaoCollection: ITipoSolicitacao[],
    ...tipoSolicitacaosToCheck: (ITipoSolicitacao | null | undefined)[]
  ): ITipoSolicitacao[] {
    const tipoSolicitacaos: ITipoSolicitacao[] = tipoSolicitacaosToCheck.filter(isPresent);
    if (tipoSolicitacaos.length > 0) {
      const tipoSolicitacaoCollectionIdentifiers = tipoSolicitacaoCollection.map(
        tipoSolicitacaoItem => getTipoSolicitacaoIdentifier(tipoSolicitacaoItem)!
      );
      const tipoSolicitacaosToAdd = tipoSolicitacaos.filter(tipoSolicitacaoItem => {
        const tipoSolicitacaoIdentifier = getTipoSolicitacaoIdentifier(tipoSolicitacaoItem);
        if (tipoSolicitacaoIdentifier == null || tipoSolicitacaoCollectionIdentifiers.includes(tipoSolicitacaoIdentifier)) {
          return false;
        }
        tipoSolicitacaoCollectionIdentifiers.push(tipoSolicitacaoIdentifier);
        return true;
      });
      return [...tipoSolicitacaosToAdd, ...tipoSolicitacaoCollection];
    }
    return tipoSolicitacaoCollection;
  }
}
