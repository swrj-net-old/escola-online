import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { ChamadaComponent } from './chamada.component';
import { ChamadaDetailComponent } from './chamada-detail.component';
import { ChamadaUpdateComponent } from './chamada-update.component';
import { ChamadaDeleteDialogComponent } from './chamada-delete-dialog.component';
import { chamadaRoute } from './chamada.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(chamadaRoute)],
  declarations: [ChamadaComponent, ChamadaDetailComponent, ChamadaUpdateComponent, ChamadaDeleteDialogComponent],
  entryComponents: [ChamadaDeleteDialogComponent],
})
export class EscolaOnlineChamadaModule {}
