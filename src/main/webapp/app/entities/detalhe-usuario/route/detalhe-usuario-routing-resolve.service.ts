import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';
import { DetalheUsuarioService } from '../service/detalhe-usuario.service';

@Injectable({ providedIn: 'root' })
export class DetalheUsuarioRoutingResolveService implements Resolve<IDetalheUsuario> {
  constructor(protected service: DetalheUsuarioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetalheUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detalheUsuario: HttpResponse<DetalheUsuario>) => {
          if (detalheUsuario.body) {
            return of(detalheUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetalheUsuario());
  }
}
