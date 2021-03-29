import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEscola, Escola } from '../escola.model';
import { EscolaService } from '../service/escola.service';

@Injectable({ providedIn: 'root' })
export class EscolaRoutingResolveService implements Resolve<IEscola> {
  constructor(protected service: EscolaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEscola> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((escola: HttpResponse<Escola>) => {
          if (escola.body) {
            return of(escola.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Escola());
  }
}
