import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoSolicitacao, TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';
import { TipoSolicitacaoComponent } from './tipo-solicitacao.component';
import { TipoSolicitacaoDetailComponent } from './tipo-solicitacao-detail.component';
import { TipoSolicitacaoUpdateComponent } from './tipo-solicitacao-update.component';

@Injectable({ providedIn: 'root' })
export class TipoSolicitacaoResolve implements Resolve<ITipoSolicitacao> {
  constructor(private service: TipoSolicitacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoSolicitacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoSolicitacao: HttpResponse<TipoSolicitacao>) => {
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

export const tipoSolicitacaoRoute: Routes = [
  {
    path: '',
    component: TipoSolicitacaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.tipoSolicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoSolicitacaoDetailComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.tipoSolicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoSolicitacaoUpdateComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.tipoSolicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoSolicitacaoUpdateComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.tipoSolicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
