import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConteudo } from '../conteudo.model';
import { ConteudoService } from '../service/conteudo.service';
import { ConteudoDeleteDialogComponent } from '../delete/conteudo-delete-dialog.component';

@Component({
  selector: 'jhi-conteudo',
  templateUrl: './conteudo.component.html',
})
export class ConteudoComponent implements OnInit {
  conteudos?: IConteudo[];
  isLoading = false;

  constructor(protected conteudoService: ConteudoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.conteudoService.query().subscribe(
      (res: HttpResponse<IConteudo[]>) => {
        this.isLoading = false;
        this.conteudos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IConteudo): number {
    return item.id!;
  }

  delete(conteudo: IConteudo): void {
    const modalRef = this.modalService.open(ConteudoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.conteudo = conteudo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
