jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IConteudo, Conteudo } from '../conteudo.model';
import { ConteudoService } from '../service/conteudo.service';

import { ConteudoRoutingResolveService } from './conteudo-routing-resolve.service';

describe('Service Tests', () => {
  describe('Conteudo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ConteudoRoutingResolveService;
    let service: ConteudoService;
    let resultConteudo: IConteudo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ConteudoRoutingResolveService);
      service = TestBed.inject(ConteudoService);
      resultConteudo = undefined;
    });

    describe('resolve', () => {
      it('should return IConteudo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConteudo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultConteudo).toEqual({ id: 123 });
      });

      it('should return new IConteudo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConteudo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultConteudo).toEqual(new Conteudo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConteudo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultConteudo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
