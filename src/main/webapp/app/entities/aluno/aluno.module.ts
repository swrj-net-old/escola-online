import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EscolaOnlineSharedModule } from 'app/shared/shared.module';
import { AlunoComponent } from './aluno.component';
import { AlunoDetailComponent } from './aluno-detail.component';
import { AlunoUpdateComponent } from './aluno-update.component';
import { AlunoDeleteDialogComponent } from './aluno-delete-dialog.component';
import { alunoRoute } from './aluno.route';

@NgModule({
  imports: [EscolaOnlineSharedModule, RouterModule.forChild(alunoRoute)],
  declarations: [AlunoComponent, AlunoDetailComponent, AlunoUpdateComponent, AlunoDeleteDialogComponent],
  entryComponents: [AlunoDeleteDialogComponent],
})
export class EscolaOnlineAlunoModule {}
