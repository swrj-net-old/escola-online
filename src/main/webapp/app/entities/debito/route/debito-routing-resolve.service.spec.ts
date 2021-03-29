jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDebito, Debito } from '../debito.model';
import { DebitoService } from '../service/debito.service';

import { DebitoRoutingResolveService } from './debito-routing-resolve.service';

describe('Service Tests', () => {
  describe('Debito routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DebitoRoutingResolveService;
    let service: DebitoService;
    let resultDebito: IDebito | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DebitoRoutingResolveService);
      service = TestBed.inject(DebitoService);
      resultDebito = undefined;
    });

    describe('resolve', () => {
      it('should return IDebito returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDebito = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDebito).toEqual({ id: 123 });
      });

      it('should return new IDebito if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDebito = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDebito).toEqual(new Debito());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDebito = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDebito).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
