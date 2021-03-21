import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMateria } from 'app/shared/model/materia.model';
import { MateriaService } from './materia.service';
import { MateriaDeleteDialogComponent } from './materia-delete-dialog.component';

@Component({
  selector: 'jhi-materia',
  templateUrl: './materia.component.html',
})
export class MateriaComponent implements OnInit, OnDestroy {
  materias?: IMateria[];
  eventSubscriber?: Subscription;

  constructor(protected materiaService: MateriaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.materiaService.query().subscribe((res: HttpResponse<IMateria[]>) => (this.materias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMaterias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMateria): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMaterias(): void {
    this.eventSubscriber = this.eventManager.subscribe('materiaListModification', () => this.loadAll());
  }

  delete(materia: IMateria): void {
    const modalRef = this.modalService.open(MateriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.materia = materia;
  }
}
