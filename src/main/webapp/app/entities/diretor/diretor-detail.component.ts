import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiretor } from 'app/shared/model/diretor.model';

@Component({
  selector: 'jhi-diretor-detail',
  templateUrl: './diretor-detail.component.html',
})
export class DiretorDetailComponent implements OnInit {
  diretor: IDiretor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diretor }) => (this.diretor = diretor));
  }

  previousState(): void {
    window.history.back();
  }
}
