import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoSolicitacaoComponent } from '../list/tipo-solicitacao.component';
import { TipoSolicitacaoDetailComponent } from '../detail/tipo-solicitacao-detail.component';
import { TipoSolicitacaoUpdateComponent } from '../update/tipo-solicitacao-update.component';
import { TipoSolicitacaoRoutingResolveService } from './tipo-solicitacao-routing-resolve.service';

const tipoSolicitacaoRoute: Routes = [
  {
    path: '',
    component: TipoSolicitacaoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoSolicitacaoDetailComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoSolicitacaoUpdateComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoSolicitacaoUpdateComponent,
    resolve: {
      tipoSolicitacao: TipoSolicitacaoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoSolicitacaoRoute)],
  exports: [RouterModule],
})
export class TipoSolicitacaoRoutingModule {}
