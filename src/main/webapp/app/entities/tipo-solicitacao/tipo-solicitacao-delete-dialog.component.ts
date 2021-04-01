import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { TipoSolicitacaoService } from './tipo-solicitacao.service';

@Component({
  templateUrl: './tipo-solicitacao-delete-dialog.component.html',
})
export class TipoSolicitacaoDeleteDialogComponent {
  tipoSolicitacao?: ITipoSolicitacao;

  constructor(
    protected tipoSolicitacaoService: TipoSolicitacaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoSolicitacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoSolicitacaoListModification');
      this.activeModal.close();
    });
  }
}
