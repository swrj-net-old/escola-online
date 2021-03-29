import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISerie } from 'app/shared/model/serie.model';
import { SerieService } from './serie.service';

@Component({
  templateUrl: './serie-delete-dialog.component.html',
})
export class SerieDeleteDialogComponent {
  serie?: ISerie;

  constructor(protected serieService: SerieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serieListModification');
      this.activeModal.close();
    });
  }
}
