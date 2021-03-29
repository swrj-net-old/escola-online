jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITipoSolicitacao, TipoSolicitacao } from '../tipo-solicitacao.model';
import { TipoSolicitacaoService } from '../service/tipo-solicitacao.service';

import { TipoSolicitacaoRoutingResolveService } from './tipo-solicitacao-routing-resolve.service';

describe('Service Tests', () => {
  describe('TipoSolicitacao routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TipoSolicitacaoRoutingResolveService;
    let service: TipoSolicitacaoService;
    let resultTipoSolicitacao: ITipoSolicitacao | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TipoSolicitacaoRoutingResolveService);
      service = TestBed.inject(TipoSolicitacaoService);
      resultTipoSolicitacao = undefined;
    });

    describe('resolve', () => {
      it('should return ITipoSolicitacao returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoSolicitacao = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoSolicitacao).toEqual({ id: 123 });
      });

      it('should return new ITipoSolicitacao if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoSolicitacao = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTipoSolicitacao).toEqual(new TipoSolicitacao());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoSolicitacao = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoSolicitacao).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
