import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistoricoDebito, getHistoricoDebitoIdentifier } from '../historico-debito.model';

export type EntityResponseType = HttpResponse<IHistoricoDebito>;
export type EntityArrayResponseType = HttpResponse<IHistoricoDebito[]>;

@Injectable({ providedIn: 'root' })
export class HistoricoDebitoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/historico-debitos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(historicoDebito: IHistoricoDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoDebito);
    return this.http
      .post<IHistoricoDebito>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historicoDebito: IHistoricoDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoDebito);
    return this.http
      .put<IHistoricoDebito>(`${this.resourceUrl}/${getHistoricoDebitoIdentifier(historicoDebito) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(historicoDebito: IHistoricoDebito): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoDebito);
    return this.http
      .patch<IHistoricoDebito>(`${this.resourceUrl}/${getHistoricoDebitoIdentifier(historicoDebito) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoricoDebito>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoricoDebito[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHistoricoDebitoToCollectionIfMissing(
    historicoDebitoCollection: IHistoricoDebito[],
    ...historicoDebitosToCheck: (IHistoricoDebito | null | undefined)[]
  ): IHistoricoDebito[] {
    const historicoDebitos: IHistoricoDebito[] = historicoDebitosToCheck.filter(isPresent);
    if (historicoDebitos.length > 0) {
      const historicoDebitoCollectionIdentifiers = historicoDebitoCollection.map(
        historicoDebitoItem => getHistoricoDebitoIdentifier(historicoDebitoItem)!
      );
      const historicoDebitosToAdd = historicoDebitos.filter(historicoDebitoItem => {
        const historicoDebitoIdentifier = getHistoricoDebitoIdentifier(historicoDebitoItem);
        if (historicoDebitoIdentifier == null || historicoDebitoCollectionIdentifiers.includes(historicoDebitoIdentifier)) {
          return false;
        }
        historicoDebitoCollectionIdentifiers.push(historicoDebitoIdentifier);
        return true;
      });
      return [...historicoDebitosToAdd, ...historicoDebitoCollection];
    }
    return historicoDebitoCollection;
  }

  protected convertDateFromClient(historicoDebito: IHistoricoDebito): IHistoricoDebito {
    return Object.assign({}, historicoDebito, {
      dataLancamento: historicoDebito.dataLancamento?.isValid() ? historicoDebito.dataLancamento.format(DATE_FORMAT) : undefined,
      dataVencimento: historicoDebito.dataVencimento?.isValid() ? historicoDebito.dataVencimento.format(DATE_FORMAT) : undefined,
      dataPagamento: historicoDebito.dataPagamento?.isValid() ? historicoDebito.dataPagamento.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataLancamento = res.body.dataLancamento ? dayjs(res.body.dataLancamento) : undefined;
      res.body.dataVencimento = res.body.dataVencimento ? dayjs(res.body.dataVencimento) : undefined;
      res.body.dataPagamento = res.body.dataPagamento ? dayjs(res.body.dataPagamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historicoDebito: IHistoricoDebito) => {
        historicoDebito.dataLancamento = historicoDebito.dataLancamento ? dayjs(historicoDebito.dataLancamento) : undefined;
        historicoDebito.dataVencimento = historicoDebito.dataVencimento ? dayjs(historicoDebito.dataVencimento) : undefined;
        historicoDebito.dataPagamento = historicoDebito.dataPagamento ? dayjs(historicoDebito.dataPagamento) : undefined;
      });
    }
    return res;
  }
}
