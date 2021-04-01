import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoricoDebito, HistoricoDebito } from 'app/shared/model/historico-debito.model';
import { HistoricoDebitoService } from './historico-debito.service';
import { HistoricoDebitoComponent } from './historico-debito.component';
import { HistoricoDebitoDetailComponent } from './historico-debito-detail.component';
import { HistoricoDebitoUpdateComponent } from './historico-debito-update.component';

@Injectable({ providedIn: 'root' })
export class HistoricoDebitoResolve implements Resolve<IHistoricoDebito> {
  constructor(private service: HistoricoDebitoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoricoDebito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historicoDebito: HttpResponse<HistoricoDebito>) => {
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

export const historicoDebitoRoute: Routes = [
  {
    path: '',
    component: HistoricoDebitoComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.historicoDebito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoricoDebitoDetailComponent,
    resolve: {
      historicoDebito: HistoricoDebitoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.historicoDebito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoricoDebitoUpdateComponent,
    resolve: {
      historicoDebito: HistoricoDebitoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.historicoDebito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoricoDebitoUpdateComponent,
    resolve: {
      historicoDebito: HistoricoDebitoResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.historicoDebito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
