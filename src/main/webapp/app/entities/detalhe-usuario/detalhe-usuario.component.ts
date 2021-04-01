import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { DetalheUsuarioService } from './detalhe-usuario.service';
import { DetalheUsuarioDeleteDialogComponent } from './detalhe-usuario-delete-dialog.component';

@Component({
  selector: 'jhi-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
})
export class DetalheUsuarioComponent implements OnInit, OnDestroy {
  detalheUsuarios?: IDetalheUsuario[];
  eventSubscriber?: Subscription;

  constructor(
    protected detalheUsuarioService: DetalheUsuarioService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detalheUsuarioService.query().subscribe((res: HttpResponse<IDetalheUsuario[]>) => (this.detalheUsuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetalheUsuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDetalheUsuario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDetalheUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('detalheUsuarioListModification', () => this.loadAll());
  }

  delete(detalheUsuario: IDetalheUsuario): void {
    const modalRef = this.modalService.open(DetalheUsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalheUsuario = detalheUsuario;
  }
}
