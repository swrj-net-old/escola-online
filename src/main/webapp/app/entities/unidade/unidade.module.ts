import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { UnidadeComponent } from './unidade.component';
import { UnidadeDetailComponent } from './unidade-detail.component';
import { UnidadeUpdateComponent } from './unidade-update.component';
import { UnidadeDeleteDialogComponent } from './unidade-delete-dialog.component';
import { unidadeRoute } from './unidade.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(unidadeRoute)],
  declarations: [UnidadeComponent, UnidadeDetailComponent, UnidadeUpdateComponent, UnidadeDeleteDialogComponent],
  entryComponents: [UnidadeDeleteDialogComponent],
})
export class EscolaOnlineUnidadeModule {}
