import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConteudo, Conteudo } from '../conteudo.model';
import { ConteudoService } from '../service/conteudo.service';

@Injectable({ providedIn: 'root' })
export class ConteudoRoutingResolveService implements Resolve<IConteudo> {
  constructor(protected service: ConteudoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConteudo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conteudo: HttpResponse<Conteudo>) => {
          if (conteudo.body) {
            return of(conteudo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Conteudo());
  }
}
