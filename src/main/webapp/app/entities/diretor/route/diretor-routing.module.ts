import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DiretorComponent } from '../list/diretor.component';
import { DiretorDetailComponent } from '../detail/diretor-detail.component';
import { DiretorUpdateComponent } from '../update/diretor-update.component';
import { DiretorRoutingResolveService } from './diretor-routing-resolve.service';

const diretorRoute: Routes = [
  {
    path: '',
    component: DiretorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiretorDetailComponent,
    resolve: {
      diretor: DiretorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiretorUpdateComponent,
    resolve: {
      diretor: DiretorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiretorUpdateComponent,
    resolve: {
      diretor: DiretorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(diretorRoute)],
  exports: [RouterModule],
})
export class DiretorRoutingModule {}
