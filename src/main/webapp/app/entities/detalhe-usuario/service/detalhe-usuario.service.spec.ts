import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDetalheUsuario, DetalheUsuario } from '../detalhe-usuario.model';

import { DetalheUsuarioService } from './detalhe-usuario.service';

describe('Service Tests', () => {
  describe('DetalheUsuario Service', () => {
    let service: DetalheUsuarioService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetalheUsuario;
    let expectedResult: IDetalheUsuario | IDetalheUsuario[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetalheUsuarioService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cpf: 'AAAAAAA',
        celular: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DetalheUsuario', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DetalheUsuario()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetalheUsuario', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cpf: 'BBBBBB',
            celular: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DetalheUsuario', () => {
        const patchObject = Object.assign({}, new DetalheUsuario());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetalheUsuario', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cpf: 'BBBBBB',
            celular: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DetalheUsuario', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetalheUsuarioToCollectionIfMissing', () => {
        it('should add a DetalheUsuario to an empty array', () => {
          const detalheUsuario: IDetalheUsuario = { id: 123 };
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing([], detalheUsuario);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detalheUsuario);
        });

        it('should not add a DetalheUsuario to an array that contains it', () => {
          const detalheUsuario: IDetalheUsuario = { id: 123 };
          const detalheUsuarioCollection: IDetalheUsuario[] = [
            {
              ...detalheUsuario,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing(detalheUsuarioCollection, detalheUsuario);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetalheUsuario to an array that doesn't contain it", () => {
          const detalheUsuario: IDetalheUsuario = { id: 123 };
          const detalheUsuarioCollection: IDetalheUsuario[] = [{ id: 456 }];
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing(detalheUsuarioCollection, detalheUsuario);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detalheUsuario);
        });

        it('should add only unique DetalheUsuario to an array', () => {
          const detalheUsuarioArray: IDetalheUsuario[] = [{ id: 123 }, { id: 456 }, { id: 33844 }];
          const detalheUsuarioCollection: IDetalheUsuario[] = [{ id: 123 }];
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing(detalheUsuarioCollection, ...detalheUsuarioArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detalheUsuario: IDetalheUsuario = { id: 123 };
          const detalheUsuario2: IDetalheUsuario = { id: 456 };
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing([], detalheUsuario, detalheUsuario2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detalheUsuario);
          expect(expectedResult).toContain(detalheUsuario2);
        });

        it('should accept null and undefined values', () => {
          const detalheUsuario: IDetalheUsuario = { id: 123 };
          expectedResult = service.addDetalheUsuarioToCollectionIfMissing([], null, detalheUsuario, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detalheUsuario);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
