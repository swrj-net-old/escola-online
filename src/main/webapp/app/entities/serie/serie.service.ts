import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISerie } from 'app/shared/model/serie.model';

type EntityResponseType = HttpResponse<ISerie>;
type EntityArrayResponseType = HttpResponse<ISerie[]>;

@Injectable({ providedIn: 'root' })
export class SerieService {
  public resourceUrl = SERVER_API_URL + 'api/series';

  constructor(protected http: HttpClient) {}

  create(serie: ISerie): Observable<EntityResponseType> {
    return this.http.post<ISerie>(this.resourceUrl, serie, { observe: 'response' });
  }

  update(serie: ISerie): Observable<EntityResponseType> {
    return this.http.put<ISerie>(this.resourceUrl, serie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISerie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISerie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
