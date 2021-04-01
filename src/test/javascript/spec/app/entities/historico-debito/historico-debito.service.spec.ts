import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HistoricoDebitoService } from 'app/entities/historico-debito/historico-debito.service';
import { IHistoricoDebito, HistoricoDebito } from 'app/shared/model/historico-debito.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

describe('Service Tests', () => {
  describe('HistoricoDebito Service', () => {
    let injector: TestBed;
    let service: HistoricoDebitoService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoricoDebito;
    let expectedResult: IHistoricoDebito | IHistoricoDebito[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoricoDebitoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistoricoDebito(0, currentDate, SituacaoDebito.NAO_PAGO, currentDate, currentDate, 0, 0, 0, 0, 'AAAAAAA');
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

      it('should return a list of HistoricoDebito', () => {
        const returnedFromService = Object.assign(
          {
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
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
