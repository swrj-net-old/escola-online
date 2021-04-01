import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { HistoricoDebitoService } from './historico-debito.service';

@Component({
  templateUrl: './historico-debito-delete-dialog.component.html',
})
export class HistoricoDebitoDeleteDialogComponent {
  historicoDebito?: IHistoricoDebito;

  constructor(
    protected historicoDebitoService: HistoricoDebitoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historicoDebitoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historicoDebitoListModification');
      this.activeModal.close();
    });
  }
}
