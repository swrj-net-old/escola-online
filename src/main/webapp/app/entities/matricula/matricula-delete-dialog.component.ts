import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMatricula } from 'app/shared/model/matricula.model';
import { MatriculaService } from './matricula.service';

@Component({
  templateUrl: './matricula-delete-dialog.component.html',
})
export class MatriculaDeleteDialogComponent {
  matricula?: IMatricula;

  constructor(protected matriculaService: MatriculaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.matriculaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('matriculaListModification');
      this.activeModal.close();
    });
  }
}
