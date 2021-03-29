import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { TipoDebito } from 'app/entities/enumerations/tipo-debito.model';
import { SituacaoDebito } from 'app/entities/enumerations/situacao-debito.model';
import { IDebito, Debito } from '../debito.model';

import { DebitoService } from './debito.service';

describe('Service Tests', () => {
  describe('Debito Service', () => {
    let service: DebitoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDebito;
    let expectedResult: IDebito | IDebito[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DebitoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        tipoDebito: TipoDebito.MENSALIDADE,
        situacaoDebito: SituacaoDebito.NAO_PAGO,
        dataVencimento: currentDate,
        dataPagamento: currentDate,
        valorOriginal: 0,
        totalPago: 0,
        totalDesconto: 0,
        totalDevido: 0,
        observacoes: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataVencimento: currentDate.format(DATE_FORMAT),
            dataPagamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Debito', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataVencimento: currentDate.format(DATE_FORMAT),
            dataPagamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataVencimento: currentDate,
            dataPagamento: currentDate,
          },
          returnedFromService
        );

        service.create(new Debito()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Debito', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            tipoDebito: 'BBBBBB',
            situacaoDebito: 'BBBBBB',
            dataVencimento: currentDate.format(DATE_FORMAT),
            dataPagamento: currentDate.format(DATE_FORMAT),
            valorOriginal: 1,
            totalPago: 1,
            totalDesconto: 1,
            totalDevido: 1,
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataVencimento: currentDate,
            dataPagamento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Debito', () => {
        const patchObject = Object.assign(
          {
            tipoDebito: 'BBBBBB',
            dataPagamento: currentDate.format(DATE_FORMAT),
            valorOriginal: 1,
            totalDesconto: 1,
            totalDevido: 1,
            observacoes: 'BBBBBB',
          },
          new Debito()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataVencimento: currentDate,
            dataPagamento: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Debito', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            tipoDebito: 'BBBBBB',
            situacaoDebito: 'BBBBBB',
            dataVencimento: currentDate.format(DATE_FORMAT),
            dataPagamento: currentDate.format(DATE_FORMAT),
            valorOriginal: 1,
            totalPago: 1,
            totalDesconto: 1,
            totalDevido: 1,
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataVencimento: currentDate,
            dataPagamento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Debito', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDebitoToCollectionIfMissing', () => {
        it('should add a Debito to an empty array', () => {
          const debito: IDebito = { id: 123 };
          expectedResult = service.addDebitoToCollectionIfMissing([], debito);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(debito);
        });

        it('should not add a Debito to an array that contains it', () => {
          const debito: IDebito = { id: 123 };
          const debitoCollection: IDebito[] = [
            {
              ...debito,
            },
            { id: 456 },
          ];
          expectedResult = service.addDebitoToCollectionIfMissing(debitoCollection, debito);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Debito to an array that doesn't contain it", () => {
          const debito: IDebito = { id: 123 };
          const debitoCollection: IDebito[] = [{ id: 456 }];
          expectedResult = service.addDebitoToCollectionIfMissing(debitoCollection, debito);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(debito);
        });

        it('should add only unique Debito to an array', () => {
          const debitoArray: IDebito[] = [{ id: 123 }, { id: 456 }, { id: 87352 }];
          const debitoCollection: IDebito[] = [{ id: 123 }];
          expectedResult = service.addDebitoToCollectionIfMissing(debitoCollection, ...debitoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const debito: IDebito = { id: 123 };
          const debito2: IDebito = { id: 456 };
          expectedResult = service.addDebitoToCollectionIfMissing([], debito, debito2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(debito);
          expect(expectedResult).toContain(debito2);
        });

        it('should accept null and undefined values', () => {
          const debito: IDebito = { id: 123 };
          expectedResult = service.addDebitoToCollectionIfMissing([], null, debito, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(debito);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
