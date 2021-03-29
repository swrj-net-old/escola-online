import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChamadaComponent } from '../list/chamada.component';
import { ChamadaDetailComponent } from '../detail/chamada-detail.component';
import { ChamadaUpdateComponent } from '../update/chamada-update.component';
import { ChamadaRoutingResolveService } from './chamada-routing-resolve.service';

const chamadaRoute: Routes = [
  {
    path: '',
    component: ChamadaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChamadaDetailComponent,
    resolve: {
      chamada: ChamadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChamadaUpdateComponent,
    resolve: {
      chamada: ChamadaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chamadaRoute)],
  exports: [RouterModule],
})
export class ChamadaRoutingModule {}
