import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConteudoComponent } from '../list/conteudo.component';
import { ConteudoDetailComponent } from '../detail/conteudo-detail.component';
import { ConteudoUpdateComponent } from '../update/conteudo-update.component';
import { ConteudoRoutingResolveService } from './conteudo-routing-resolve.service';

const conteudoRoute: Routes = [
  {
    path: '',
    component: ConteudoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConteudoDetailComponent,
    resolve: {
      conteudo: ConteudoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConteudoUpdateComponent,
    resolve: {
      conteudo: ConteudoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConteudoUpdateComponent,
    resolve: {
      conteudo: ConteudoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conteudoRoute)],
  exports: [RouterModule],
})
export class ConteudoRoutingModule {}
