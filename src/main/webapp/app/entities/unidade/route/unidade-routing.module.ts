import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UnidadeComponent } from '../list/unidade.component';
import { UnidadeDetailComponent } from '../detail/unidade-detail.component';
import { UnidadeUpdateComponent } from '../update/unidade-update.component';
import { UnidadeRoutingResolveService } from './unidade-routing-resolve.service';

const unidadeRoute: Routes = [
  {
    path: '',
    component: UnidadeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadeDetailComponent,
    resolve: {
      unidade: UnidadeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadeUpdateComponent,
    resolve: {
      unidade: UnidadeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadeUpdateComponent,
    resolve: {
      unidade: UnidadeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(unidadeRoute)],
  exports: [RouterModule],
})
export class UnidadeRoutingModule {}
