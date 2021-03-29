import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EscolaComponent } from '../list/escola.component';
import { EscolaDetailComponent } from '../detail/escola-detail.component';
import { EscolaUpdateComponent } from '../update/escola-update.component';
import { EscolaRoutingResolveService } from './escola-routing-resolve.service';

const escolaRoute: Routes = [
  {
    path: '',
    component: EscolaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EscolaDetailComponent,
    resolve: {
      escola: EscolaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EscolaUpdateComponent,
    resolve: {
      escola: EscolaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EscolaUpdateComponent,
    resolve: {
      escola: EscolaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(escolaRoute)],
  exports: [RouterModule],
})
export class EscolaRoutingModule {}
