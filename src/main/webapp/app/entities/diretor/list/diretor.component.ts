import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiretor } from '../diretor.model';
import { DiretorService } from '../service/diretor.service';
import { DiretorDeleteDialogComponent } from '../delete/diretor-delete-dialog.component';

@Component({
  selector: 'jhi-diretor',
  templateUrl: './diretor.component.html',
})
export class DiretorComponent implements OnInit {
  diretors?: IDiretor[];
  isLoading = false;

  constructor(protected diretorService: DiretorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.diretorService.query().subscribe(
      (res: HttpResponse<IDiretor[]>) => {
        this.isLoading = false;
        this.diretors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDiretor): number {
    return item.id!;
  }

  delete(diretor: IDiretor): void {
    const modalRef = this.modalService.open(DiretorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diretor = diretor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
