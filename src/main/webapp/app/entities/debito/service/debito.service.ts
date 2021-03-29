import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDebito, getDebitoIdentifier } from '../debito.model';

export type EntityResponseType = HttpResponse<IDebito>;
export type EntityArrayResponseType = HttpResponse<IDebito[]>;

@Injectable({ providedIn: 'root' })
export class DebitoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/debitos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(debito: IDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(debito);
    return this.http
      .post<IDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(debito: IDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(debito);
    return this.http
      .put<IDebito>(`${this.resourceUrl}/${getDebitoIdentifier(debito) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(debito: IDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(debito);
    return this.http
      .patch<IDebito>(`${this.resourceUrl}/${getDebitoIdentifier(debito) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDebito>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDebito[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDebitoToCollectionIfMissing(debitoCollection: IDebito[], ...debitosToCheck: (IDebito | null | undefined)[]): IDebito[] {
    const debitos: IDebito[] = debitosToCheck.filter(isPresent);
    if (debitos.length > 0) {
      const debitoCollectionIdentifiers = debitoCollection.map(debitoItem => getDebitoIdentifier(debitoItem)!);
      const debitosToAdd = debitos.filter(debitoItem => {
        const debitoIdentifier = getDebitoIdentifier(debitoItem);
        if (debitoIdentifier == null || debitoCollectionIdentifiers.includes(debitoIdentifier)) {
          return false;
        }
        debitoCollectionIdentifiers.push(debitoIdentifier);
        return true;
      });
      return [...debitosToAdd, ...debitoCollection];
    }
    return debitoCollection;
  }

  protected convertDateFromClient(debito: IDebito): IDebito {
    return Object.assign({}, debito, {
      dataVencimento: debito.dataVencimento?.isValid() ? debito.dataVencimento.format(DATE_FORMAT) : undefined,
      dataPagamento: debito.dataPagamento?.isValid() ? debito.dataPagamento.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataVencimento = res.body.dataVencimento ? dayjs(res.body.dataVencimento) : undefined;
      res.body.dataPagamento = res.body.dataPagamento ? dayjs(res.body.dataPagamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((debito: IDebito) => {
        debito.dataVencimento = debito.dataVencimento ? dayjs(debito.dataVencimento) : undefined;
        debito.dataPagamento = debito.dataPagamento ? dayjs(debito.dataPagamento) : undefined;
      });
    }
    return res;
  }
}
