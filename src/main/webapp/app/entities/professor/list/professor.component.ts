import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfessor } from '../professor.model';
import { ProfessorService } from '../service/professor.service';
import { ProfessorDeleteDialogComponent } from '../delete/professor-delete-dialog.component';

@Component({
  selector: 'jhi-professor',
  templateUrl: './professor.component.html',
})
export class ProfessorComponent implements OnInit {
  professors?: IProfessor[];
  isLoading = false;

  constructor(protected professorService: ProfessorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.professorService.query().subscribe(
      (res: HttpResponse<IProfessor[]>) => {
        this.isLoading = false;
        this.professors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProfessor): number {
    return item.id!;
  }

  delete(professor: IProfessor): void {
    const modalRef = this.modalService.open(ProfessorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.professor = professor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
