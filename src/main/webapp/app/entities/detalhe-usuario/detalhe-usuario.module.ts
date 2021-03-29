import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DetalheUsuarioComponent } from './list/detalhe-usuario.component';
import { DetalheUsuarioDetailComponent } from './detail/detalhe-usuario-detail.component';
import { DetalheUsuarioUpdateComponent } from './update/detalhe-usuario-update.component';
import { DetalheUsuarioDeleteDialogComponent } from './delete/detalhe-usuario-delete-dialog.component';
import { DetalheUsuarioRoutingModule } from './route/detalhe-usuario-routing.module';

@NgModule({
  imports: [SharedModule, DetalheUsuarioRoutingModule],
  declarations: [
    DetalheUsuarioComponent,
    DetalheUsuarioDetailComponent,
    DetalheUsuarioUpdateComponent,
    DetalheUsuarioDeleteDialogComponent,
  ],
  entryComponents: [DetalheUsuarioDeleteDialogComponent],
})
export class DetalheUsuarioModule {}
