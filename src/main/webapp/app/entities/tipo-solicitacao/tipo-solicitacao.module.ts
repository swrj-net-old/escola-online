import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { TipoSolicitacaoComponent } from './tipo-solicitacao.component';
import { TipoSolicitacaoDetailComponent } from './tipo-solicitacao-detail.component';
import { TipoSolicitacaoUpdateComponent } from './tipo-solicitacao-update.component';
import { TipoSolicitacaoDeleteDialogComponent } from './tipo-solicitacao-delete-dialog.component';
import { tipoSolicitacaoRoute } from './tipo-solicitacao.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(tipoSolicitacaoRoute)],
  declarations: [
    TipoSolicitacaoComponent,
    TipoSolicitacaoDetailComponent,
    TipoSolicitacaoUpdateComponent,
    TipoSolicitacaoDeleteDialogComponent,
  ],
  entryComponents: [TipoSolicitacaoDeleteDialogComponent],
})
export class EscolaOnlineTipoSolicitacaoModule {}
