import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDebito, Debito } from 'app/shared/model/debito.model';
import { DebitoService } from './debito.service';
import { DebitoComponent } from './debito.component';
import { DebitoDetailComponent } from './debito-detail.component';
import { DebitoUpdateComponent } from './debito-update.component';

@Injectable({ providedIn: 'root' })
export class DebitoResolve implements Resolve<IDebito> {
  constructor(private service: DebitoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDebito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((debito: HttpResponse<Debito>) => {
          if (debito.body) {
            return of(debito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Debito());
  }
}

export const debitoRoute: Routes = [
  {
    path: '',
    component: DebitoComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'escolaOnlineApp.debito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DebitoDetailComponent,
    resolve: {
      debito: DebitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.debito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DebitoUpdateComponent,
    resolve: {
      debito: DebitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.debito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DebitoUpdateComponent,
    resolve: {
      debito: DebitoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.debito.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
