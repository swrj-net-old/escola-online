import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMateria } from 'app/shared/model/materia.model';
import { MateriaService } from './materia.service';

@Component({
  templateUrl: './materia-delete-dialog.component.html',
})
export class MateriaDeleteDialogComponent {
  materia?: IMateria;

  constructor(protected materiaService: MateriaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materiaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('materiaListModification');
      this.activeModal.close();
    });
  }
}
