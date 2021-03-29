import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChamada, Chamada } from '../chamada.model';
import { ChamadaService } from '../service/chamada.service';

@Injectable({ providedIn: 'root' })
export class ChamadaRoutingResolveService implements Resolve<IChamada> {
  constructor(protected service: ChamadaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChamada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chamada: HttpResponse<Chamada>) => {
          if (chamada.body) {
            return of(chamada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chamada());
  }
}
