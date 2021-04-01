import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { DebitoComponent } from './debito.component';
import { DebitoDetailComponent } from './debito-detail.component';
import { DebitoUpdateComponent } from './debito-update.component';
import { DebitoDeleteDialogComponent } from './debito-delete-dialog.component';
import { debitoRoute } from './debito.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(debitoRoute)],
  declarations: [DebitoComponent, DebitoDetailComponent, DebitoUpdateComponent, DebitoDeleteDialogComponent],
  entryComponents: [DebitoDeleteDialogComponent],
})
export class EscolaOnlineDebitoModule {}
