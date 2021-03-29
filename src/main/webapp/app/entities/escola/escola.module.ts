import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { EscolaComponent } from './escola.component';
import { EscolaDetailComponent } from './escola-detail.component';
import { EscolaUpdateComponent } from './escola-update.component';
import { EscolaDeleteDialogComponent } from './escola-delete-dialog.component';
import { escolaRoute } from './escola.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(escolaRoute)],
  declarations: [EscolaComponent, EscolaDetailComponent, EscolaUpdateComponent, EscolaDeleteDialogComponent],
  entryComponents: [EscolaDeleteDialogComponent],
})
export class EscolaOnlineEscolaModule {}
