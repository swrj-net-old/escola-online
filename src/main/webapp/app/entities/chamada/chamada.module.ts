import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ChamadaComponent } from './list/chamada.component';
import { ChamadaDetailComponent } from './detail/chamada-detail.component';
import { ChamadaUpdateComponent } from './update/chamada-update.component';
import { ChamadaDeleteDialogComponent } from './delete/chamada-delete-dialog.component';
import { ChamadaRoutingModule } from './route/chamada-routing.module';

@NgModule({
  imports: [SharedModule, ChamadaRoutingModule],
  declarations: [ChamadaComponent, ChamadaDetailComponent, ChamadaUpdateComponent, ChamadaDeleteDialogComponent],
  entryComponents: [ChamadaDeleteDialogComponent],
})
export class ChamadaModule {}
