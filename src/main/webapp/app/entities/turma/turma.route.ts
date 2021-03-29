import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITurma, Turma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';
import { TurmaComponent } from './turma.component';
import { TurmaDetailComponent } from './turma-detail.component';
import { TurmaUpdateComponent } from './turma-update.component';

@Injectable({ providedIn: 'root' })
export class TurmaResolve implements Resolve<ITurma> {
  constructor(private service: TurmaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITurma> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((turma: HttpResponse<Turma>) => {
          if (turma.body) {
            return of(turma.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Turma());
  }
}

export const turmaRoute: Routes = [
  {
    path: '',
    component: TurmaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.turma.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TurmaDetailComponent,
    resolve: {
      turma: TurmaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.turma.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TurmaUpdateComponent,
    resolve: {
      turma: TurmaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.turma.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TurmaUpdateComponent,
    resolve: {
      turma: TurmaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.turma.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
