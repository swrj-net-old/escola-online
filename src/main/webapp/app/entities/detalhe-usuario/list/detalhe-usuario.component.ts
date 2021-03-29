import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalheUsuario } from '../detalhe-usuario.model';
import { DetalheUsuarioService } from '../service/detalhe-usuario.service';
import { DetalheUsuarioDeleteDialogComponent } from '../delete/detalhe-usuario-delete-dialog.component';

@Component({
  selector: 'jhi-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
})
export class DetalheUsuarioComponent implements OnInit {
  detalheUsuarios?: IDetalheUsuario[];
  isLoading = false;

  constructor(protected detalheUsuarioService: DetalheUsuarioService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.detalheUsuarioService.query().subscribe(
      (res: HttpResponse<IDetalheUsuario[]>) => {
        this.isLoading = false;
        this.detalheUsuarios = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDetalheUsuario): number {
    return item.id!;
  }

  delete(detalheUsuario: IDetalheUsuario): void {
    const modalRef = this.modalService.open(DetalheUsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalheUsuario = detalheUsuario;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
