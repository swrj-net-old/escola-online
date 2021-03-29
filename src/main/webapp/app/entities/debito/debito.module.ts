import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DebitoComponent } from './list/debito.component';
import { DebitoDetailComponent } from './detail/debito-detail.component';
import { DebitoUpdateComponent } from './update/debito-update.component';
import { DebitoDeleteDialogComponent } from './delete/debito-delete-dialog.component';
import { DebitoRoutingModule } from './route/debito-routing.module';

@NgModule({
  imports: [SharedModule, DebitoRoutingModule],
  declarations: [DebitoComponent, DebitoDetailComponent, DebitoUpdateComponent, DebitoDeleteDialogComponent],
  entryComponents: [DebitoDeleteDialogComponent],
})
export class DebitoModule {}
