import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoSolicitacaoService } from 'app/entities/tipo-solicitacao/tipo-solicitacao.service';
import { ITipoSolicitacao, TipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

describe('Service Tests', () => {
  describe('TipoSolicitacao Service', () => {
    let injector: TestBed;
    let service: TipoSolicitacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoSolicitacao;
    let expectedResult: ITipoSolicitacao | ITipoSolicitacao[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TipoSolicitacaoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TipoSolicitacao(0, 'AAAAAAA', 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TipoSolicitacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoSolicitacao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoSolicitacao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            prazoAtendimento: 1,
            valorEmissao: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoSolicitacao', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            prazoAtendimento: 1,
            valorEmissao: 1,
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

      it('should delete a TipoSolicitacao', () => {
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
