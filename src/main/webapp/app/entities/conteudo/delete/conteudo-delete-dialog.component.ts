import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConteudo } from '../conteudo.model';
import { ConteudoService } from '../service/conteudo.service';

@Component({
  templateUrl: './conteudo-delete-dialog.component.html',
})
export class ConteudoDeleteDialogComponent {
  conteudo?: IConteudo;

  constructor(protected conteudoService: ConteudoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conteudoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
