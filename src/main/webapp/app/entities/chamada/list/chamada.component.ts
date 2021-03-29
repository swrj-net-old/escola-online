import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChamada } from '../chamada.model';
import { ChamadaService } from '../service/chamada.service';
import { ChamadaDeleteDialogComponent } from '../delete/chamada-delete-dialog.component';

@Component({
  selector: 'jhi-chamada',
  templateUrl: './chamada.component.html',
})
export class ChamadaComponent implements OnInit {
  chamadas?: IChamada[];
  isLoading = false;

  constructor(protected chamadaService: ChamadaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.chamadaService.query().subscribe(
      (res: HttpResponse<IChamada[]>) => {
        this.isLoading = false;
        this.chamadas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IChamada): number {
    return item.id!;
  }

  delete(chamada: IChamada): void {
    const modalRef = this.modalService.open(ChamadaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chamada = chamada;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
