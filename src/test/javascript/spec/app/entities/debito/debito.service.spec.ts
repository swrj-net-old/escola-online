import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DebitoService } from 'app/entities/debito/debito.service';
import { IDebito, Debito } from 'app/shared/model/debito.model';
import { TipoDebito } from 'app/shared/model/enumerations/tipo-debito.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

describe('Service Tests', () => {
  describe('Debito Service', () => {
    let injector: TestBed;
    let service: DebitoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDebito;
    let expectedResult: IDebito | IDebito[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DebitoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Debito(0, TipoDebito.MENSALIDADE, SituacaoDebito.NAO_PAGO, currentDate, currentDate, 0, 0, 0, 0, 'AAAAAAA');
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

      it('should return a list of Debito', () => {
        const returnedFromService = Object.assign(
          {
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
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
