import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEscola } from '../escola.model';
import { EscolaService } from '../service/escola.service';
import { EscolaDeleteDialogComponent } from '../delete/escola-delete-dialog.component';

@Component({
  selector: 'jhi-escola',
  templateUrl: './escola.component.html',
})
export class EscolaComponent implements OnInit {
  escolas?: IEscola[];
  isLoading = false;

  constructor(protected escolaService: EscolaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.escolaService.query().subscribe(
      (res: HttpResponse<IEscola[]>) => {
        this.isLoading = false;
        this.escolas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEscola): number {
    return item.id!;
  }

  delete(escola: IEscola): void {
    const modalRef = this.modalService.open(EscolaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.escola = escola;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
