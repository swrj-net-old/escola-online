import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoSolicitacao } from '../tipo-solicitacao.model';
import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';

@Component({
  templateUrl: './tipo-solicitacao-delete-dialog.component.html',
})
export class TipoSolicitacaoDeleteDialogComponent {
  tipoSolicitacao?: ITipoSolicitacao;

  constructor(protected tipoSolicitacaoService: TipoSolicitacaoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoSolicitacaoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
