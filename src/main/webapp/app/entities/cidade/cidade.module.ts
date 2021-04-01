import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { CidadeComponent } from './cidade.component';
import { CidadeDetailComponent } from './cidade-detail.component';
import { CidadeUpdateComponent } from './cidade-update.component';
import { CidadeDeleteDialogComponent } from './cidade-delete-dialog.component';
import { cidadeRoute } from './cidade.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(cidadeRoute)],
  declarations: [CidadeComponent, CidadeDetailComponent, CidadeUpdateComponent, CidadeDeleteDialogComponent],
  entryComponents: [CidadeDeleteDialogComponent],
})
export class EscolaOnlineCidadeModule {}
