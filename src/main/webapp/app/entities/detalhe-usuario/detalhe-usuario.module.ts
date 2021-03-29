import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { DetalheUsuarioComponent } from './detalhe-usuario.component';
import { DetalheUsuarioDetailComponent } from './detalhe-usuario-detail.component';
import { DetalheUsuarioUpdateComponent } from './detalhe-usuario-update.component';
import { DetalheUsuarioDeleteDialogComponent } from './detalhe-usuario-delete-dialog.component';
import { detalheUsuarioRoute } from './detalhe-usuario.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(detalheUsuarioRoute)],
  declarations: [
    DetalheUsuarioComponent,
    DetalheUsuarioDetailComponent,
    DetalheUsuarioUpdateComponent,
    DetalheUsuarioDeleteDialogComponent,
  ],
  entryComponents: [DetalheUsuarioDeleteDialogComponent],
})
export class EscolaOnlineDetalheUsuarioModule {}
