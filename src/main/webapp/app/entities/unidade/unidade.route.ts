import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnidade, Unidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from './unidade.service';
import { UnidadeComponent } from './unidade.component';
import { UnidadeDetailComponent } from './unidade-detail.component';
import { UnidadeUpdateComponent } from './unidade-update.component';

@Injectable({ providedIn: 'root' })
export class UnidadeResolve implements Resolve<IUnidade> {
  constructor(private service: UnidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unidade: HttpResponse<Unidade>) => {
          if (unidade.body) {
            return of(unidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Unidade());
  }
}

export const unidadeRoute: Routes = [
  {
    path: '',
    component: UnidadeComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.unidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadeDetailComponent,
    resolve: {
      unidade: UnidadeResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.unidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadeUpdateComponent,
    resolve: {
      unidade: UnidadeResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.unidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadeUpdateComponent,
    resolve: {
      unidade: UnidadeResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'escolaOnlineApp.unidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
