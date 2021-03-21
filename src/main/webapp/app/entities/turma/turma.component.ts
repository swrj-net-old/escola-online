import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from './turma.service';
import { TurmaDeleteDialogComponent } from './turma-delete-dialog.component';

@Component({
  selector: 'jhi-turma',
  templateUrl: './turma.component.html',
})
export class TurmaComponent implements OnInit, OnDestroy {
  turmas?: ITurma[];
  eventSubscriber?: Subscription;

  constructor(protected turmaService: TurmaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.turmaService.query().subscribe((res: HttpResponse<ITurma[]>) => (this.turmas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTurmas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITurma): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTurmas(): void {
    this.eventSubscriber = this.eventManager.subscribe('turmaListModification', () => this.loadAll());
  }

  delete(turma: ITurma): void {
    const modalRef = this.modalService.open(TurmaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.turma = turma;
  }
}
