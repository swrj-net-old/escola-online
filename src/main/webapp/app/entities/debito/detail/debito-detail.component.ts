import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDebito } from '../debito.model';

@Component({
  selector: 'jhi-debito-detail',
  templateUrl: './debito-detail.component.html',
})
export class DebitoDetailComponent implements OnInit {
  debito: IDebito | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ debito }) => {
      this.debito = debito;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
