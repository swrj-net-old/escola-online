jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMateria, Materia } from '../materia.model';
import { MateriaService } from '../service/materia.service';

import { MateriaRoutingResolveService } from './materia-routing-resolve.service';

describe('Service Tests', () => {
  describe('Materia routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MateriaRoutingResolveService;
    let service: MateriaService;
    let resultMateria: IMateria | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MateriaRoutingResolveService);
      service = TestBed.inject(MateriaService);
      resultMateria = undefined;
    });

    describe('resolve', () => {
      it('should return IMateria returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMateria = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMateria).toEqual({ id: 123 });
      });

      it('should return new IMateria if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMateria = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMateria).toEqual(new Materia());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMateria = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMateria).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
