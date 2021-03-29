import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDetalheUsuario, getDetalheUsuarioIdentifier } from '../detalhe-usuario.model';

export type EntityResponseType = HttpResponse<IDetalheUsuario>;
export type EntityArrayResponseType = HttpResponse<IDetalheUsuario[]>;

@Injectable({ providedIn: 'root' })
export class DetalheUsuarioService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/detalhe-usuarios');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(detalheUsuario: IDetalheUsuario): Observable<EntityResponseType> {
    return this.http.post<IDetalheUsuario>(this.resourceUrl, detalheUsuario, { observe: 'response' });
  }

  update(detalheUsuario: IDetalheUsuario): Observable<EntityResponseType> {
    return this.http.put<IDetalheUsuario>(`${this.resourceUrl}/${getDetalheUsuarioIdentifier(detalheUsuario) as number}`, detalheUsuario, {
      observe: 'response',
    });
  }

  partialUpdate(detalheUsuario: IDetalheUsuario): Observable<EntityResponseType> {
    return this.http.patch<IDetalheUsuario>(
      `${this.resourceUrl}/${getDetalheUsuarioIdentifier(detalheUsuario) as number}`,
      detalheUsuario,
      { observe: 'response' }
    );
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

  addDetalheUsuarioToCollectionIfMissing(
    detalheUsuarioCollection: IDetalheUsuario[],
    ...detalheUsuariosToCheck: (IDetalheUsuario | null | undefined)[]
  ): IDetalheUsuario[] {
    const detalheUsuarios: IDetalheUsuario[] = detalheUsuariosToCheck.filter(isPresent);
    if (detalheUsuarios.length > 0) {
      const detalheUsuarioCollectionIdentifiers = detalheUsuarioCollection.map(
        detalheUsuarioItem => getDetalheUsuarioIdentifier(detalheUsuarioItem)!
      );
      const detalheUsuariosToAdd = detalheUsuarios.filter(detalheUsuarioItem => {
        const detalheUsuarioIdentifier = getDetalheUsuarioIdentifier(detalheUsuarioItem);
        if (detalheUsuarioIdentifier == null || detalheUsuarioCollectionIdentifiers.includes(detalheUsuarioIdentifier)) {
          return false;
        }
        detalheUsuarioCollectionIdentifiers.push(detalheUsuarioIdentifier);
        return true;
      });
      return [...detalheUsuariosToAdd, ...detalheUsuarioCollection];
    }
    return detalheUsuarioCollection;
  }
}
