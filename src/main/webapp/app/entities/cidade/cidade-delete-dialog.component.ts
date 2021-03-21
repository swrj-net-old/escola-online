import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from './cidade.service';

@Component({
  templateUrl: './cidade-delete-dialog.component.html',
})
export class CidadeDeleteDialogComponent {
  cidade?: ICidade;

  constructor(protected cidadeService: CidadeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cidadeListModification');
      this.activeModal.close();
    });
  }
}
