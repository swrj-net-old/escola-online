import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMatricula } from 'app/shared/model/matricula.model';
import { MatriculaService } from './matricula.service';
import { MatriculaDeleteDialogComponent } from './matricula-delete-dialog.component';

@Component({
  selector: 'jhi-matricula',
  templateUrl: './matricula.component.html',
})
export class MatriculaComponent implements OnInit, OnDestroy {
  matriculas?: IMatricula[];
  eventSubscriber?: Subscription;

  constructor(protected matriculaService: MatriculaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.matriculaService.query().subscribe((res: HttpResponse<IMatricula[]>) => (this.matriculas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMatriculas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMatricula): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMatriculas(): void {
    this.eventSubscriber = this.eventManager.subscribe('matriculaListModification', () => this.loadAll());
  }

  delete(matricula: IMatricula): void {
    const modalRef = this.modalService.open(MatriculaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.matricula = matricula;
  }
}
