import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoricoDebito } from '../historico-debito.model';
import { HistoricoDebitoService } from '../service/historico-debito.service';

@Component({
  templateUrl: './historico-debito-delete-dialog.component.html',
})
export class HistoricoDebitoDeleteDialogComponent {
  historicoDebito?: IHistoricoDebito;

  constructor(protected historicoDebitoService: HistoricoDebitoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historicoDebitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
