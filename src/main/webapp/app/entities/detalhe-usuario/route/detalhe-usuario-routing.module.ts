import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetalheUsuarioComponent } from '../list/detalhe-usuario.component';
import { DetalheUsuarioDetailComponent } from '../detail/detalhe-usuario-detail.component';
import { DetalheUsuarioUpdateComponent } from '../update/detalhe-usuario-update.component';
import { DetalheUsuarioRoutingResolveService } from './detalhe-usuario-routing-resolve.service';

const detalheUsuarioRoute: Routes = [
  {
    path: '',
    component: DetalheUsuarioComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetalheUsuarioDetailComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetalheUsuarioUpdateComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetalheUsuarioUpdateComponent,
    resolve: {
      detalheUsuario: DetalheUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detalheUsuarioRoute)],
  exports: [RouterModule],
})
export class DetalheUsuarioRoutingModule {}
