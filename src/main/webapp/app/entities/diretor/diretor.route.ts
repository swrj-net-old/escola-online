import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiretor, Diretor } from 'app/shared/model/diretor.model';
import { DiretorService } from './diretor.service';
import { DiretorComponent } from './diretor.component';
import { DiretorDetailComponent } from './diretor-detail.component';
import { DiretorUpdateComponent } from './diretor-update.component';

@Injectable({ providedIn: 'root' })
export class DiretorResolve implements Resolve<IDiretor> {
  constructor(private service: DiretorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiretor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diretor: HttpResponse<Diretor>) => {
          if (diretor.body) {
            return of(diretor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Diretor());
  }
}

export const diretorRoute: Routes = [
  {
    path: '',
    component: DiretorComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'escolaOnlineApp.diretor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiretorDetailComponent,
    resolve: {
      diretor: DiretorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.diretor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiretorUpdateComponent,
    resolve: {
      diretor: DiretorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.diretor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiretorUpdateComponent,
    resolve: {
      diretor: DiretorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.diretor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
