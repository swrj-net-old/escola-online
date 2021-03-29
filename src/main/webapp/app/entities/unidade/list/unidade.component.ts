import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnidade } from '../unidade.model';
import { UnidadeService } from '../service/unidade.service';
import { UnidadeDeleteDialogComponent } from '../delete/unidade-delete-dialog.component';

@Component({
  selector: 'jhi-unidade',
  templateUrl: './unidade.component.html',
})
export class UnidadeComponent implements OnInit {
  unidades?: IUnidade[];
  isLoading = false;

  constructor(protected unidadeService: UnidadeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.unidadeService.query().subscribe(
      (res: HttpResponse<IUnidade[]>) => {
        this.isLoading = false;
        this.unidades = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IUnidade): number {
    return item.id!;
  }

  delete(unidade: IUnidade): void {
    const modalRef = this.modalService.open(UnidadeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unidade = unidade;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
