import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';

type EntityResponseType = HttpResponse<IDetalheUsuario>;
type EntityArrayResponseType = HttpResponse<IDetalheUsuario[]>;

@Injectable({ providedIn: 'root' })
export class DetalheUsuarioService {
  public resourceUrl = SERVER_API_URL + 'api/detalhe-usuarios';

  constructor(protected http: HttpClient) {}

  create(detalheUsuario: IDetalheUsuario): Observable<EntityResponseType> {
    return this.http.post<IDetalheUsuario>(this.resourceUrl, detalheUsuario, { observe: 'response' });
  }

  update(detalheUsuario: IDetalheUsuario): Observable<EntityResponseType> {
    return this.http.put<IDetalheUsuario>(this.resourceUrl, detalheUsuario, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDetalheUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDetalheUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
