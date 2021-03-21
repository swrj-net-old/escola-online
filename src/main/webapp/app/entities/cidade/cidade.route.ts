import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICidade, Cidade } from 'app/shared/model/cidade.model';
import { CidadeService } from './cidade.service';
import { CidadeComponent } from './cidade.component';
import { CidadeDetailComponent } from './cidade-detail.component';
import { CidadeUpdateComponent } from './cidade-update.component';

@Injectable({ providedIn: 'root' })
export class CidadeResolve implements Resolve<ICidade> {
  constructor(private service: CidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cidade: HttpResponse<Cidade>) => {
          if (cidade.body) {
            return of(cidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cidade());
  }
}

export const cidadeRoute: Routes = [
  {
    path: '',
    component: CidadeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.cidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CidadeDetailComponent,
    resolve: {
      cidade: CidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.cidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CidadeUpdateComponent,
    resolve: {
      cidade: CidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.cidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CidadeUpdateComponent,
    resolve: {
      cidade: CidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.cidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
