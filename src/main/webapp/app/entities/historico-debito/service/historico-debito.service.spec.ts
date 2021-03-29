import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { SituacaoDebito } from 'app/entities/enumerations/situacao-debito.model';
import { IHistoricoDebito, HistoricoDebito } from '../historico-debito.model';

import { HistoricoDebitoService } from './historico-debito.service';

describe('Service Tests', () => {
  describe('HistoricoDebito Service', () => {
    let service: HistoricoDebitoService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoricoDebito;
    let expectedResult: IHistoricoDebito | IHistoricoDebito[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HistoricoDebitoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        dataLancamento: currentDate,
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
            dataLancamento: currentDate.format(DATE_FORMAT),
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

      it('should create a HistoricoDebito', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataLancamento: currentDate.format(DATE_FORMAT),
            dataVencimento: currentDate.format(DATE_FORMAT),
            dataPagamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLancamento: currentDate,
            dataVencimento: currentDate,
            dataPagamento: currentDate,
          },
          returnedFromService
        );

        service.create(new HistoricoDebito()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoricoDebito', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataLancamento: currentDate.format(DATE_FORMAT),
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
            dataLancamento: currentDate,
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

      it('should partial update a HistoricoDebito', () => {
        const patchObject = Object.assign(
          {
            situacaoDebito: 'BBBBBB',
            dataVencimento: currentDate.format(DATE_FORMAT),
            valorOriginal: 1,
            observacoes: 'BBBBBB',
          },
          new HistoricoDebito()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataLancamento: currentDate,
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

      it('should return a list of HistoricoDebito', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataLancamento: currentDate.format(DATE_FORMAT),
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
            dataLancamento: currentDate,
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

      it('should delete a HistoricoDebito', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHistoricoDebitoToCollectionIfMissing', () => {
        it('should add a HistoricoDebito to an empty array', () => {
          const historicoDebito: IHistoricoDebito = { id: 123 };
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing([], historicoDebito);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historicoDebito);
        });

        it('should not add a HistoricoDebito to an array that contains it', () => {
          const historicoDebito: IHistoricoDebito = { id: 123 };
          const historicoDebitoCollection: IHistoricoDebito[] = [
            {
              ...historicoDebito,
            },
            { id: 456 },
          ];
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing(historicoDebitoCollection, historicoDebito);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a HistoricoDebito to an array that doesn't contain it", () => {
          const historicoDebito: IHistoricoDebito = { id: 123 };
          const historicoDebitoCollection: IHistoricoDebito[] = [{ id: 456 }];
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing(historicoDebitoCollection, historicoDebito);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historicoDebito);
        });

        it('should add only unique HistoricoDebito to an array', () => {
          const historicoDebitoArray: IHistoricoDebito[] = [{ id: 123 }, { id: 456 }, { id: 77719 }];
          const historicoDebitoCollection: IHistoricoDebito[] = [{ id: 123 }];
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing(historicoDebitoCollection, ...historicoDebitoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const historicoDebito: IHistoricoDebito = { id: 123 };
          const historicoDebito2: IHistoricoDebito = { id: 456 };
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing([], historicoDebito, historicoDebito2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historicoDebito);
          expect(expectedResult).toContain(historicoDebito2);
        });

        it('should accept null and undefined values', () => {
          const historicoDebito: IHistoricoDebito = { id: 123 };
          expectedResult = service.addHistoricoDebitoToCollectionIfMissing([], null, historicoDebito, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historicoDebito);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
