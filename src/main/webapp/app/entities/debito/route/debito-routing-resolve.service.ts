import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDebito, Debito } from '../debito.model';
import { DebitoService } from '../service/debito.service';

@Injectable({ providedIn: 'root' })
export class DebitoRoutingResolveService implements Resolve<IDebito> {
  constructor(protected service: DebitoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDebito> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((debito: HttpResponse<Debito>) => {
          if (debito.body) {
            return of(debito.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Debito());
  }
}
