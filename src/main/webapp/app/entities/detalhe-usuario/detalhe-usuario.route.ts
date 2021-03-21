import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDetalheUsuario, DetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { DetalheUsuarioService } from './detalhe-usuario.service';
import { DetalheUsuarioComponent } from './detalhe-usuario.component';
import { DetalheUsuarioDetailComponent } from './detalhe-usuario-detail.component';
import { DetalheUsuarioUpdateComponent } from './detalhe-usuario-update.component';

@Injectable({ providedIn: 'root' })
export class DetalheUsuarioResolve implements Resolve<IDetalheUsuario> {
  constructor(private service: DetalheUsuarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetalheUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((detalheUsuario: HttpResponse<DetalheUsuario>) => {
          if (detalheUsuario.body) {
            return of(detalheUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetalheUsuario());
  }
}

export const detalheUsuarioRoute: Routes = [
  {
    path: '',
    component: DetalheUsuarioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.detalheUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetalheUsuarioDetailComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.detalheUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetalheUsuarioUpdateComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.detalheUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetalheUsuarioUpdateComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'escolaOnlineApp.detalheUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
