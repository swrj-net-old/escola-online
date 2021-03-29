import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoricoDebito } from '../historico-debito.model';
import { HistoricoDebitoService } from '../service/historico-debito.service';
import { HistoricoDebitoDeleteDialogComponent } from '../delete/historico-debito-delete-dialog.component';

@Component({
  selector: 'jhi-historico-debito',
  templateUrl: './historico-debito.component.html',
})
export class HistoricoDebitoComponent implements OnInit {
  historicoDebitos?: IHistoricoDebito[];
  isLoading = false;

  constructor(protected historicoDebitoService: HistoricoDebitoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.historicoDebitoService.query().subscribe(
      (res: HttpResponse<IHistoricoDebito[]>) => {
        this.isLoading = false;
        this.historicoDebitos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IHistoricoDebito): number {
    return item.id!;
  }

  delete(historicoDebito: IHistoricoDebito): void {
    const modalRef = this.modalService.open(HistoricoDebitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historicoDebito = historicoDebito;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
