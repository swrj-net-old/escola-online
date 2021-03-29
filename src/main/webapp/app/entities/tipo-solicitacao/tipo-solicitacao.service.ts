import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

type EntityResponseType = HttpResponse<ITipoSolicitacao>;
type EntityArrayResponseType = HttpResponse<ITipoSolicitacao[]>;

@Injectable({ providedIn: 'root' })
export class TipoSolicitacaoService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-solicitacaos';

  constructor(protected http: HttpClient) {}

  create(tipoSolicitacao: ITipoSolicitacao): Observable<EntityResponseType> {
    return this.http.post<ITipoSolicitacao>(this.resourceUrl, tipoSolicitacao, { observe: 'response' });
  }

  update(tipoSolicitacao: ITipoSolicitacao): Observable<EntityResponseType> {
    return this.http.put<ITipoSolicitacao>(this.resourceUrl, tipoSolicitacao, { observe: 'response' });
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
}
