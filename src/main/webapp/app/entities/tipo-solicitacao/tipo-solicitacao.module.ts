import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TipoSolicitacaoComponent } from './list/tipo-solicitacao.component';
import { TipoSolicitacaoDetailComponent } from './detail/tipo-solicitacao-detail.component';
import { TipoSolicitacaoUpdateComponent } from './update/tipo-solicitacao-update.component';
import { TipoSolicitacaoDeleteDialogComponent } from './delete/tipo-solicitacao-delete-dialog.component';
import { TipoSolicitacaoRoutingModule } from './route/tipo-solicitacao-routing.module';

@NgModule({
  imports: [SharedModule, TipoSolicitacaoRoutingModule],
  declarations: [
    TipoSolicitacaoComponent,
    TipoSolicitacaoDetailComponent,
    TipoSolicitacaoUpdateComponent,
    TipoSolicitacaoDeleteDialogComponent,
  ],
  entryComponents: [TipoSolicitacaoDeleteDialogComponent],
})
export class TipoSolicitacaoModule {}
