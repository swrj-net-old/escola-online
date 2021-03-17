import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { DiretorComponent } from './diretor.component';
import { DiretorDetailComponent } from './diretor-detail.component';
import { DiretorUpdateComponent } from './diretor-update.component';
import { DiretorDeleteDialogComponent } from './diretor-delete-dialog.component';
import { diretorRoute } from './diretor.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(diretorRoute)],
  declarations: [DiretorComponent, DiretorDetailComponent, DiretorUpdateComponent, DiretorDeleteDialogComponent],
  entryComponents: [DiretorDeleteDialogComponent],
})
export class EscolaOnlineDiretorModule {}
