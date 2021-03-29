import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMatricula } from '../matricula.model';
import { MatriculaService } from '../service/matricula.service';

@Component({
  templateUrl: './matricula-delete-dialog.component.html',
})
export class MatriculaDeleteDialogComponent {
  matricula?: IMatricula;

  constructor(protected matriculaService: MatriculaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.matriculaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
