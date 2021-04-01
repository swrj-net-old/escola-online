import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISerie, Serie } from 'app/shared/model/serie.model';
import { SerieService } from './serie.service';
import { SerieComponent } from './serie.component';
import { SerieDetailComponent } from './serie-detail.component';
import { SerieUpdateComponent } from './serie-update.component';

@Injectable({ providedIn: 'root' })
export class SerieResolve implements Resolve<ISerie> {
  constructor(private service: SerieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISerie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serie: HttpResponse<Serie>) => {
          if (serie.body) {
            return of(serie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Serie());
  }
}

export const serieRoute: Routes = [
  {
    path: '',
    component: SerieComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'escolaOnlineApp.serie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SerieDetailComponent,
    resolve: {
      serie: SerieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.serie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SerieUpdateComponent,
    resolve: {
      serie: SerieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.serie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SerieUpdateComponent,
    resolve: {
      serie: SerieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.serie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
