import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { SolicitacaoComponent } from './solicitacao.component';
import { SolicitacaoDetailComponent } from './solicitacao-detail.component';
import { SolicitacaoUpdateComponent } from './solicitacao-update.component';
import { SolicitacaoDeleteDialogComponent } from './solicitacao-delete-dialog.component';
import { solicitacaoRoute } from './solicitacao.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(solicitacaoRoute)],
  declarations: [SolicitacaoComponent, SolicitacaoDetailComponent, SolicitacaoUpdateComponent, SolicitacaoDeleteDialogComponent],
  entryComponents: [SolicitacaoDeleteDialogComponent],
})
export class EscolaOnlineSolicitacaoModule {}
