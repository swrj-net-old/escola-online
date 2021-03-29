import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { DetalheUsuarioService } from './detalhe-usuario.service';

@Component({
  templateUrl: './detalhe-usuario-delete-dialog.component.html',
})
export class DetalheUsuarioDeleteDialogComponent {
  detalheUsuario?: IDetalheUsuario;

  constructor(
    protected detalheUsuarioService: DetalheUsuarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detalheUsuarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('detalheUsuarioListModification');
      this.activeModal.close();
    });
  }
}
