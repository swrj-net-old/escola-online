import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from './professor.service';
import { ProfessorDeleteDialogComponent } from './professor-delete-dialog.component';

@Component({
  selector: 'jhi-professor',
  templateUrl: './professor.component.html',
})
export class ProfessorComponent implements OnInit, OnDestroy {
  professors?: IProfessor[];
  eventSubscriber?: Subscription;

  constructor(protected professorService: ProfessorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.professorService.query().subscribe((res: HttpResponse<IProfessor[]>) => (this.professors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfessors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfessor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfessors(): void {
    this.eventSubscriber = this.eventManager.subscribe('professorListModification', () => this.loadAll());
  }

  delete(professor: IProfessor): void {
    const modalRef = this.modalService.open(ProfessorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.professor = professor;
  }
}
