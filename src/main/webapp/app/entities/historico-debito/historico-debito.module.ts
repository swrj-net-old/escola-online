import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { HistoricoDebitoComponent } from './historico-debito.component';
import { HistoricoDebitoDetailComponent } from './historico-debito-detail.component';
import { HistoricoDebitoUpdateComponent } from './historico-debito-update.component';
import { HistoricoDebitoDeleteDialogComponent } from './historico-debito-delete-dialog.component';
import { historicoDebitoRoute } from './historico-debito.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(historicoDebitoRoute)],
  declarations: [
    HistoricoDebitoComponent,
    HistoricoDebitoDetailComponent,
    HistoricoDebitoUpdateComponent,
    HistoricoDebitoDeleteDialogComponent,
  ],
  entryComponents: [HistoricoDebitoDeleteDialogComponent],
})
export class EscolaOnlineHistoricoDebitoModule {}
