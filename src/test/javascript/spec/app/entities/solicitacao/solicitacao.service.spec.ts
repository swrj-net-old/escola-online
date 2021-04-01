import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SolicitacaoService } from 'app/entities/solicitacao/solicitacao.service';
import { ISolicitacao, Solicitacao } from 'app/shared/model/solicitacao.model';
import { SituacaoSolicitacao } from 'app/shared/model/enumerations/situacao-solicitacao.model';

describe('Service Tests', () => {
  describe('Solicitacao Service', () => {
    let injector: TestBed;
    let service: SolicitacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: ISolicitacao;
    let expectedResult: ISolicitacao | ISolicitacao[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SolicitacaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Solicitacao(0, SituacaoSolicitacao.AGUARDANDO, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataSolicitacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Solicitacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataSolicitacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
          },
          returnedFromService
        );

        service.create(new Solicitacao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Solicitacao', () => {
        const returnedFromService = Object.assign(
          {
            situacaoSolicitacao: 'BBBBBB',
            dataSolicitacao: currentDate.format(DATE_FORMAT),
            observacoesSolicitante: 'BBBBBB',
            observacoesAtendimento: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Solicitacao', () => {
        const returnedFromService = Object.assign(
          {
            situacaoSolicitacao: 'BBBBBB',
            dataSolicitacao: currentDate.format(DATE_FORMAT),
            observacoesSolicitante: 'BBBBBB',
            observacoesAtendimento: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataSolicitacao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Solicitacao', () => {
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
