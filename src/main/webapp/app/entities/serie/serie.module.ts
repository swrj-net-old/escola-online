import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { SerieComponent } from './serie.component';
import { SerieDetailComponent } from './serie-detail.component';
import { SerieUpdateComponent } from './serie-update.component';
import { SerieDeleteDialogComponent } from './serie-delete-dialog.component';
import { serieRoute } from './serie.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(serieRoute)],
  declarations: [SerieComponent, SerieDetailComponent, SerieUpdateComponent, SerieDeleteDialogComponent],
  entryComponents: [SerieDeleteDialogComponent],
})
export class EscolaOnlineSerieModule {}
