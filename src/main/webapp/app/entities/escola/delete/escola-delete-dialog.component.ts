import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEscola } from '../escola.model';
import { EscolaService } from '../service/escola.service';

@Component({
  templateUrl: './escola-delete-dialog.component.html',
})
export class EscolaDeleteDialogComponent {
  escola?: IEscola;

  constructor(protected escolaService: EscolaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.escolaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
