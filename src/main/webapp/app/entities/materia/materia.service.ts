import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMateria } from 'app/shared/model/materia.model';

type EntityResponseType = HttpResponse<IMateria>;
type EntityArrayResponseType = HttpResponse<IMateria[]>;

@Injectable({ providedIn: 'root' })
export class MateriaService {
  public resourceUrl = SERVER_API_URL + 'api/materias';

  constructor(protected http: HttpClient) {}

  create(materia: IMateria): Observable<EntityResponseType> {
    return this.http.post<IMateria>(this.resourceUrl, materia, { observe: 'response' });
  }

  update(materia: IMateria): Observable<EntityResponseType> {
    return this.http.put<IMateria>(this.resourceUrl, materia, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMateria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMateria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
