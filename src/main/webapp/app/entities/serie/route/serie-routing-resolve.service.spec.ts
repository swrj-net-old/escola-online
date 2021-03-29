jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISerie, Serie } from '../serie.model';
import { SerieService } from '../service/serie.service';

import { SerieRoutingResolveService } from './serie-routing-resolve.service';

describe('Service Tests', () => {
  describe('Serie routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SerieRoutingResolveService;
    let service: SerieService;
    let resultSerie: ISerie | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SerieRoutingResolveService);
      service = TestBed.inject(SerieService);
      resultSerie = undefined;
    });

    describe('resolve', () => {
      it('should return ISerie returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSerie = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSerie).toEqual({ id: 123 });
      });

      it('should return new ISerie if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSerie = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSerie).toEqual(new Serie());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSerie = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSerie).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
