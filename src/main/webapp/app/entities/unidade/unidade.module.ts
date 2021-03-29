import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { UnidadeComponent } from './list/unidade.component';
import { UnidadeDetailComponent } from './detail/unidade-detail.component';
import { UnidadeUpdateComponent } from './update/unidade-update.component';
import { UnidadeDeleteDialogComponent } from './delete/unidade-delete-dialog.component';
import { UnidadeRoutingModule } from './route/unidade-routing.module';

@NgModule({
  imports: [SharedModule, UnidadeRoutingModule],
  declarations: [UnidadeComponent, UnidadeDetailComponent, UnidadeUpdateComponent, UnidadeDeleteDialogComponent],
  entryComponents: [UnidadeDeleteDialogComponent],
})
export class UnidadeModule {}
