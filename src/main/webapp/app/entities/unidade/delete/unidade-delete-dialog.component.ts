import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidade } from '../unidade.model';
import { UnidadeService } from '../service/unidade.service';

@Component({
  templateUrl: './unidade-delete-dialog.component.html',
})
export class UnidadeDeleteDialogComponent {
  unidade?: IUnidade;

  constructor(protected unidadeService: UnidadeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
