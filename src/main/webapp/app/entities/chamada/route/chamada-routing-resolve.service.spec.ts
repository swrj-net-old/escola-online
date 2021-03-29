jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IChamada, Chamada } from '../chamada.model';
import { ChamadaService } from '../service/chamada.service';

import { ChamadaRoutingResolveService } from './chamada-routing-resolve.service';

describe('Service Tests', () => {
  describe('Chamada routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ChamadaRoutingResolveService;
    let service: ChamadaService;
    let resultChamada: IChamada | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ChamadaRoutingResolveService);
      service = TestBed.inject(ChamadaService);
      resultChamada = undefined;
    });

    describe('resolve', () => {
      it('should return IChamada returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChamada = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChamada).toEqual({ id: 123 });
      });

      it('should return new IChamada if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChamada = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultChamada).toEqual(new Chamada());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultChamada = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultChamada).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
