jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IHistoricoDebito, HistoricoDebito } from '../historico-debito.model';
import { HistoricoDebitoService } from '../service/historico-debito.service';

import { HistoricoDebitoRoutingResolveService } from './historico-debito-routing-resolve.service';

describe('Service Tests', () => {
  describe('HistoricoDebito routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: HistoricoDebitoRoutingResolveService;
    let service: HistoricoDebitoService;
    let resultHistoricoDebito: IHistoricoDebito | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(HistoricoDebitoRoutingResolveService);
      service = TestBed.inject(HistoricoDebitoService);
      resultHistoricoDebito = undefined;
    });

    describe('resolve', () => {
      it('should return IHistoricoDebito returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHistoricoDebito = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHistoricoDebito).toEqual({ id: 123 });
      });

      it('should return new IHistoricoDebito if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHistoricoDebito = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultHistoricoDebito).toEqual(new HistoricoDebito());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHistoricoDebito = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHistoricoDebito).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
