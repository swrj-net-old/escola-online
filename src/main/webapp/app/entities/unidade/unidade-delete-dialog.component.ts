import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnidade } from 'app/shared/model/unidade.model';
import { UnidadeService } from './unidade.service';

@Component({
  templateUrl: './unidade-delete-dialog.component.html',
})
export class UnidadeDeleteDialogComponent {
  unidade?: IUnidade;

  constructor(protected unidadeService: UnidadeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unidadeListModification');
      this.activeModal.close();
    });
  }
}
