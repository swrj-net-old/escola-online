import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IChamada, Chamada } from '../chamada.model';

import { ChamadaService } from './chamada.service';

describe('Service Tests', () => {
  describe('Chamada Service', () => {
    let service: ChamadaService;
    let httpMock: HttpTestingController;
    let elemDefault: IChamada;
    let expectedResult: IChamada | IChamada[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ChamadaService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        dataAula: currentDate,
        observacoes: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataAula: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Chamada', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataAula: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAula: currentDate,
          },
          returnedFromService
        );

        service.create(new Chamada()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Chamada', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataAula: currentDate.format(DATE_FORMAT),
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAula: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Chamada', () => {
        const patchObject = Object.assign(
          {
            observacoes: 'BBBBBB',
          },
          new Chamada()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataAula: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Chamada', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataAula: currentDate.format(DATE_FORMAT),
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAula: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Chamada', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addChamadaToCollectionIfMissing', () => {
        it('should add a Chamada to an empty array', () => {
          const chamada: IChamada = { id: 123 };
          expectedResult = service.addChamadaToCollectionIfMissing([], chamada);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(chamada);
        });

        it('should not add a Chamada to an array that contains it', () => {
          const chamada: IChamada = { id: 123 };
          const chamadaCollection: IChamada[] = [
            {
              ...chamada,
            },
            { id: 456 },
          ];
          expectedResult = service.addChamadaToCollectionIfMissing(chamadaCollection, chamada);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Chamada to an array that doesn't contain it", () => {
          const chamada: IChamada = { id: 123 };
          const chamadaCollection: IChamada[] = [{ id: 456 }];
          expectedResult = service.addChamadaToCollectionIfMissing(chamadaCollection, chamada);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(chamada);
        });

        it('should add only unique Chamada to an array', () => {
          const chamadaArray: IChamada[] = [{ id: 123 }, { id: 456 }, { id: 71666 }];
          const chamadaCollection: IChamada[] = [{ id: 123 }];
          expectedResult = service.addChamadaToCollectionIfMissing(chamadaCollection, ...chamadaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const chamada: IChamada = { id: 123 };
          const chamada2: IChamada = { id: 456 };
          expectedResult = service.addChamadaToCollectionIfMissing([], chamada, chamada2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(chamada);
          expect(expectedResult).toContain(chamada2);
        });

        it('should accept null and undefined values', () => {
          const chamada: IChamada = { id: 123 };
          expectedResult = service.addChamadaToCollectionIfMissing([], null, chamada, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(chamada);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
