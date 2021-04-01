import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiretor } from 'app/shared/model/diretor.model';
import { DiretorService } from './diretor.service';

@Component({
  templateUrl: './diretor-delete-dialog.component.html',
})
export class DiretorDeleteDialogComponent {
  diretor?: IDiretor;

  constructor(protected diretorService: DiretorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diretorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diretorListModification');
      this.activeModal.close();
    });
  }
}
