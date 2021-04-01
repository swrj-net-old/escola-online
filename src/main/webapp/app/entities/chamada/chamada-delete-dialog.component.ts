import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChamada } from 'app/shared/model/chamada.model';
import { ChamadaService } from './chamada.service';

@Component({
  templateUrl: './chamada-delete-dialog.component.html',
})
export class ChamadaDeleteDialogComponent {
  chamada?: IChamada;

  constructor(protected chamadaService: ChamadaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chamadaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chamadaListModification');
      this.activeModal.close();
    });
  }
}
