import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISolicitacao, Solicitacao } from 'app/shared/model/solicitacao.model';
import { SolicitacaoService } from './solicitacao.service';
import { SolicitacaoComponent } from './solicitacao.component';
import { SolicitacaoDetailComponent } from './solicitacao-detail.component';
import { SolicitacaoUpdateComponent } from './solicitacao-update.component';

@Injectable({ providedIn: 'root' })
export class SolicitacaoResolve implements Resolve<ISolicitacao> {
  constructor(private service: SolicitacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISolicitacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((solicitacao: HttpResponse<Solicitacao>) => {
          if (solicitacao.body) {
            return of(solicitacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Solicitacao());
  }
}

export const solicitacaoRoute: Routes = [
  {
    path: '',
    component: SolicitacaoComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.solicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SolicitacaoDetailComponent,
    resolve: {
      solicitacao: SolicitacaoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.solicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SolicitacaoUpdateComponent,
    resolve: {
      solicitacao: SolicitacaoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.solicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SolicitacaoUpdateComponent,
    resolve: {
      solicitacao: SolicitacaoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.solicitacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
