import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChamada } from '../chamada.model';
import { ChamadaService } from '../service/chamada.service';

@Component({
  templateUrl: './chamada-delete-dialog.component.html',
})
export class ChamadaDeleteDialogComponent {
  chamada?: IChamada;

  constructor(protected chamadaService: ChamadaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chamadaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
