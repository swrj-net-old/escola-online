import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';

@Component({
  selector: 'jhi-detalhe-usuario-detail',
  templateUrl: './detalhe-usuario-detail.component.html',
})
export class DetalheUsuarioDetailComponent implements OnInit {
  detalheUsuario: IDetalheUsuario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalheUsuario }) => (this.detalheUsuario = detalheUsuario));
  }

  previousState(): void {
    window.history.back();
  }
}
