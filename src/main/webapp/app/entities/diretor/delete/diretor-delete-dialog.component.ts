import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiretor } from '../diretor.model';
import { DiretorService } from '../service/diretor.service';

@Component({
  templateUrl: './diretor-delete-dialog.component.html',
})
export class DiretorDeleteDialogComponent {
  diretor?: IDiretor;

  constructor(protected diretorService: DiretorService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diretorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
