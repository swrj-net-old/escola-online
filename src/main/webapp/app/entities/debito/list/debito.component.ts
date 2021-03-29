import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDebito } from '../debito.model';
import { DebitoService } from '../service/debito.service';
import { DebitoDeleteDialogComponent } from '../delete/debito-delete-dialog.component';

@Component({
  selector: 'jhi-debito',
  templateUrl: './debito.component.html',
})
export class DebitoComponent implements OnInit {
  debitos?: IDebito[];
  isLoading = false;

  constructor(protected debitoService: DebitoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.debitoService.query().subscribe(
      (res: HttpResponse<IDebito[]>) => {
        this.isLoading = false;
        this.debitos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDebito): number {
    return item.id!;
  }

  delete(debito: IDebito): void {
    const modalRef = this.modalService.open(DebitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.debito = debito;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
