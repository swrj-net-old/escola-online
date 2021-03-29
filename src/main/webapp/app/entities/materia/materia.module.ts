import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { MateriaComponent } from './materia.component';
import { MateriaDetailComponent } from './materia-detail.component';
import { MateriaUpdateComponent } from './materia-update.component';
import { MateriaDeleteDialogComponent } from './materia-delete-dialog.component';
import { materiaRoute } from './materia.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(materiaRoute)],
  declarations: [MateriaComponent, MateriaDetailComponent, MateriaUpdateComponent, MateriaDeleteDialogComponent],
  entryComponents: [MateriaDeleteDialogComponent],
})
export class EscolaOnlineMateriaModule {}
