import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';

@Component({
  templateUrl: './turma-delete-dialog.component.html',
})
export class TurmaDeleteDialogComponent {
  turma?: ITurma;

  constructor(protected turmaService: TurmaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.turmaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('turmaListModification');
      this.activeModal.close();
    });
  }
}
