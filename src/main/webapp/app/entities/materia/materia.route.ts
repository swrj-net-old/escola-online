import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMateria, Materia } from 'app/shared/model/materia.model';
import { MateriaService } from './materia.service';
import { MateriaComponent } from './materia.component';
import { MateriaDetailComponent } from './materia-detail.component';
import { MateriaUpdateComponent } from './materia-update.component';

@Injectable({ providedIn: 'root' })
export class MateriaResolve implements Resolve<IMateria> {
  constructor(private service: MateriaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMateria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((materia: HttpResponse<Materia>) => {
          if (materia.body) {
            return of(materia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Materia());
  }
}

export const materiaRoute: Routes = [
  {
    path: '',
    component: MateriaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.materia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MateriaDetailComponent,
    resolve: {
      materia: MateriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.materia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MateriaUpdateComponent,
    resolve: {
      materia: MateriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.materia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MateriaUpdateComponent,
    resolve: {
      materia: MateriaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.materia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
