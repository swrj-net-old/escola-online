import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChamada, Chamada } from 'app/shared/model/chamada.model';
import { ChamadaService } from './chamada.service';
import { ChamadaComponent } from './chamada.component';
import { ChamadaDetailComponent } from './chamada-detail.component';
import { ChamadaUpdateComponent } from './chamada-update.component';

@Injectable({ providedIn: 'root' })
export class ChamadaResolve implements Resolve<IChamada> {
  constructor(private service: ChamadaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChamada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chamada: HttpResponse<Chamada>) => {
          if (chamada.body) {
            return of(chamada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chamada());
  }
}

export const chamadaRoute: Routes = [
  {
    path: '',
    component: ChamadaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'escolaOnlineApp.chamada.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChamadaDetailComponent,
    resolve: {
      chamada: ChamadaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.chamada.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.chamada.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.chamada.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
