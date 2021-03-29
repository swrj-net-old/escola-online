import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EscolaComponent } from './list/escola.component';
import { EscolaDetailComponent } from './detail/escola-detail.component';
import { EscolaUpdateComponent } from './update/escola-update.component';
import { EscolaDeleteDialogComponent } from './delete/escola-delete-dialog.component';
import { EscolaRoutingModule } from './route/escola-routing.module';

@NgModule({
  imports: [SharedModule, EscolaRoutingModule],
  declarations: [EscolaComponent, EscolaDetailComponent, EscolaUpdateComponent, EscolaDeleteDialogComponent],
  entryComponents: [EscolaDeleteDialogComponent],
})
export class EscolaModule {}
