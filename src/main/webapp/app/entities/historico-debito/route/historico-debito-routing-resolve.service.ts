import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHistoricoDebito, HistoricoDebito } from '../historico-debito.model';
import { HistoricoDebitoService } from '../service/historico-debito.service';

@Injectable({ providedIn: 'root' })
export class HistoricoDebitoRoutingResolveService implements Resolve<IHistoricoDebito> {
  constructor(protected service: HistoricoDebitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoricoDebito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((historicoDebito: HttpResponse<HistoricoDebito>) => {
          if (historicoDebito.body) {
            return of(historicoDebito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoricoDebito());
  }
}
