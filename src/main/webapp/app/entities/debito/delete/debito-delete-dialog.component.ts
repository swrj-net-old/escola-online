import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDebito } from '../debito.model';
import { DebitoService } from '../service/debito.service';

@Component({
  templateUrl: './debito-delete-dialog.component.html',
})
export class DebitoDeleteDialogComponent {
  debito?: IDebito;

  constructor(protected debitoService: DebitoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.debitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
