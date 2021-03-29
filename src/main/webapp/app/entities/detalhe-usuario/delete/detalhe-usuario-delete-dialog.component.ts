import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalheUsuario } from '../detalhe-usuario.model';
import { DetalheUsuarioService } from '../service/detalhe-usuario.service';

@Component({
  templateUrl: './detalhe-usuario-delete-dialog.component.html',
})
export class DetalheUsuarioDeleteDialogComponent {
  detalheUsuario?: IDetalheUsuario;

  constructor(protected detalheUsuarioService: DetalheUsuarioService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detalheUsuarioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
