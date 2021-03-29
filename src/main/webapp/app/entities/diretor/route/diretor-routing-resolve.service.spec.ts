jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDiretor, Diretor } from '../diretor.model';
import { DiretorService } from '../service/diretor.service';

import { DiretorRoutingResolveService } from './diretor-routing-resolve.service';

describe('Service Tests', () => {
  describe('Diretor routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DiretorRoutingResolveService;
    let service: DiretorService;
    let resultDiretor: IDiretor | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DiretorRoutingResolveService);
      service = TestBed.inject(DiretorService);
      resultDiretor = undefined;
    });

    describe('resolve', () => {
      it('should return IDiretor returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiretor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDiretor).toEqual({ id: 123 });
      });

      it('should return new IDiretor if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiretor = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDiretor).toEqual(new Diretor());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDiretor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDiretor).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
