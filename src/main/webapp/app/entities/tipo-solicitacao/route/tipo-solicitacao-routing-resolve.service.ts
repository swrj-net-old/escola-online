import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoSolicitacao, TipoSolicitacao } from '../tipo-solicitacao.model';
import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';

@Injectable({ providedIn: 'root' })
export class TipoSolicitacaoRoutingResolveService implements Resolve<ITipoSolicitacao> {
  constructor(protected service: TipoSolicitacaoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoSolicitacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoSolicitacao: HttpResponse<TipoSolicitacao>) => {
          if (tipoSolicitacao.body) {
            return of(tipoSolicitacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoSolicitacao());
  }
}
