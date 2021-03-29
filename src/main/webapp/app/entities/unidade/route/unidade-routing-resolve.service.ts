import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUnidade, Unidade } from '../unidade.model';
import { UnidadeService } from '../service/unidade.service';

@Injectable({ providedIn: 'root' })
export class UnidadeRoutingResolveService implements Resolve<IUnidade> {
  constructor(protected service: UnidadeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((unidade: HttpResponse<Unidade>) => {
          if (unidade.body) {
            return of(unidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Unidade());
  }
}
