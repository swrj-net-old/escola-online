import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDebito } from 'app/shared/model/debito.model';
import { DebitoService } from './debito.service';

@Component({
  templateUrl: './debito-delete-dialog.component.html',
})
export class DebitoDeleteDialogComponent {
  debito?: IDebito;

  constructor(protected debitoService: DebitoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.debitoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('debitoListModification');
      this.activeModal.close();
    });
  }
}
