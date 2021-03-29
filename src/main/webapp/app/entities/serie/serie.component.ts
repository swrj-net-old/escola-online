import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISerie } from 'app/shared/model/serie.model';
import { SerieService } from './serie.service';
import { SerieDeleteDialogComponent } from './serie-delete-dialog.component';

@Component({
  selector: 'jhi-serie',
  templateUrl: './serie.component.html',
})
export class SerieComponent implements OnInit, OnDestroy {
  series?: ISerie[];
  eventSubscriber?: Subscription;

  constructor(protected serieService: SerieService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.serieService.query().subscribe((res: HttpResponse<ISerie[]>) => (this.series = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSeries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISerie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSeries(): void {
    this.eventSubscriber = this.eventManager.subscribe('serieListModification', () => this.loadAll());
  }

  delete(serie: ISerie): void {
    const modalRef = this.modalService.open(SerieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serie = serie;
  }
}
