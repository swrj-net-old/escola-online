import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDiretor, Diretor } from '../diretor.model';
import { DiretorService } from '../service/diretor.service';

@Injectable({ providedIn: 'root' })
export class DiretorRoutingResolveService implements Resolve<IDiretor> {
  constructor(protected service: DiretorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiretor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((diretor: HttpResponse<Diretor>) => {
          if (diretor.body) {
            return of(diretor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Diretor());
  }
}
