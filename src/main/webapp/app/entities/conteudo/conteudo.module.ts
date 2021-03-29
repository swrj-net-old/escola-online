import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ConteudoComponent } from './list/conteudo.component';
import { ConteudoDetailComponent } from './detail/conteudo-detail.component';
import { ConteudoUpdateComponent } from './update/conteudo-update.component';
import { ConteudoDeleteDialogComponent } from './delete/conteudo-delete-dialog.component';
import { ConteudoRoutingModule } from './route/conteudo-routing.module';

@NgModule({
  imports: [SharedModule, ConteudoRoutingModule],
  declarations: [ConteudoComponent, ConteudoDetailComponent, ConteudoUpdateComponent, ConteudoDeleteDialogComponent],
  entryComponents: [ConteudoDeleteDialogComponent],
})
export class ConteudoModule {}
