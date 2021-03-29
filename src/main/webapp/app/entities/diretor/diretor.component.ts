import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiretor } from 'app/shared/model/diretor.model';
import { DiretorService } from './diretor.service';
import { DiretorDeleteDialogComponent } from './diretor-delete-dialog.component';

@Component({
  selector: 'jhi-diretor',
  templateUrl: './diretor.component.html',
})
export class DiretorComponent implements OnInit, OnDestroy {
  diretors?: IDiretor[];
  eventSubscriber?: Subscription;

  constructor(protected diretorService: DiretorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.diretorService.query().subscribe((res: HttpResponse<IDiretor[]>) => (this.diretors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiretors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiretor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiretors(): void {
    this.eventSubscriber = this.eventManager.subscribe('diretorListModification', () => this.loadAll());
  }

  delete(diretor: IDiretor): void {
    const modalRef = this.modalService.open(DiretorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diretor = diretor;
  }
}
