import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { SolicitacaoService } from './solicitacao.service';

@Component({
  templateUrl: './solicitacao-delete-dialog.component.html',
})
export class SolicitacaoDeleteDialogComponent {
  solicitacao?: ISolicitacao;

  constructor(
    protected solicitacaoService: SolicitacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.solicitacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('solicitacaoListModification');
      this.activeModal.close();
    });
  }
}
