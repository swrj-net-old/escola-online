import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { HistoricoDebitoComponent } from './list/historico-debito.component';
import { HistoricoDebitoDetailComponent } from './detail/historico-debito-detail.component';
import { HistoricoDebitoUpdateComponent } from './update/historico-debito-update.component';
import { HistoricoDebitoDeleteDialogComponent } from './delete/historico-debito-delete-dialog.component';
import { HistoricoDebitoRoutingModule } from './route/historico-debito-routing.module';

@NgModule({
  imports: [SharedModule, HistoricoDebitoRoutingModule],
  declarations: [
    HistoricoDebitoComponent,
    HistoricoDebitoDetailComponent,
    HistoricoDebitoUpdateComponent,
    HistoricoDebitoDeleteDialogComponent,
  ],
  entryComponents: [HistoricoDebitoDeleteDialogComponent],
})
export class HistoricoDebitoModule {}
