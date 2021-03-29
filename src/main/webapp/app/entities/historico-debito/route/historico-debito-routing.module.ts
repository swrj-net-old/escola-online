import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HistoricoDebitoComponent } from '../list/historico-debito.component';
import { HistoricoDebitoDetailComponent } from '../detail/historico-debito-detail.component';
import { HistoricoDebitoUpdateComponent } from '../update/historico-debito-update.component';
import { HistoricoDebitoRoutingResolveService } from './historico-debito-routing-resolve.service';

const historicoDebitoRoute: Routes = [
  {
    path: '',
    component: HistoricoDebitoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoricoDebitoDetailComponent,
    resolve: {
      historicoDebito: HistoricoDebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoricoDebitoUpdateComponent,
    resolve: {
      historicoDebito: HistoricoDebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoricoDebitoUpdateComponent,
    resolve: {
      historicoDebito: HistoricoDebitoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(historicoDebitoRoute)],
  exports: [RouterModule],
})
export class HistoricoDebitoRoutingModule {}
