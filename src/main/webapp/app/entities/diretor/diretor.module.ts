import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DiretorComponent } from './list/diretor.component';
import { DiretorDetailComponent } from './detail/diretor-detail.component';
import { DiretorUpdateComponent } from './update/diretor-update.component';
import { DiretorDeleteDialogComponent } from './delete/diretor-delete-dialog.component';
import { DiretorRoutingModule } from './route/diretor-routing.module';

@NgModule({
  imports: [SharedModule, DiretorRoutingModule],
  declarations: [DiretorComponent, DiretorDetailComponent, DiretorUpdateComponent, DiretorDeleteDialogComponent],
  entryComponents: [DiretorDeleteDialogComponent],
})
export class DiretorModule {}
