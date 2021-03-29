import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DebitoComponent } from '../list/debito.component';
import { DebitoDetailComponent } from '../detail/debito-detail.component';
import { DebitoUpdateComponent } from '../update/debito-update.component';
import { DebitoRoutingResolveService } from './debito-routing-resolve.service';

const debitoRoute: Routes = [
  {
    path: '',
    component: DebitoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DebitoDetailComponent,
    resolve: {
      debito: DebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DebitoUpdateComponent,
    resolve: {
      debito: DebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DebitoUpdateComponent,
    resolve: {
      debito: DebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(debitoRoute)],
  exports: [RouterModule],
})
export class DebitoRoutingModule {}
