import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoSolicitacao, TipoSolicitacao } from '../tipo-solicitacao.model';

import { TipoSolicitacaoService } from './tipo-solicitacao.service';

describe('Service Tests', () => {
  describe('TipoSolicitacao Service', () => {
    let service: TipoSolicitacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoSolicitacao;
    let expectedResult: ITipoSolicitacao | ITipoSolicitacao[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TipoSolicitacaoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        prazoAtendimento: 0,
        valorEmissao: 0,
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
            id: 1,
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

      it('should partial update a TipoSolicitacao', () => {
        const patchObject = Object.assign(
          {
            valorEmissao: 1,
          },
          new TipoSolicitacao()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoSolicitacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
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

      describe('addTipoSolicitacaoToCollectionIfMissing', () => {
        it('should add a TipoSolicitacao to an empty array', () => {
          const tipoSolicitacao: ITipoSolicitacao = { id: 123 };
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing([], tipoSolicitacao);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoSolicitacao);
        });

        it('should not add a TipoSolicitacao to an array that contains it', () => {
          const tipoSolicitacao: ITipoSolicitacao = { id: 123 };
          const tipoSolicitacaoCollection: ITipoSolicitacao[] = [
            {
              ...tipoSolicitacao,
            },
            { id: 456 },
          ];
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing(tipoSolicitacaoCollection, tipoSolicitacao);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TipoSolicitacao to an array that doesn't contain it", () => {
          const tipoSolicitacao: ITipoSolicitacao = { id: 123 };
          const tipoSolicitacaoCollection: ITipoSolicitacao[] = [{ id: 456 }];
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing(tipoSolicitacaoCollection, tipoSolicitacao);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoSolicitacao);
        });

        it('should add only unique TipoSolicitacao to an array', () => {
          const tipoSolicitacaoArray: ITipoSolicitacao[] = [{ id: 123 }, { id: 456 }, { id: 5093 }];
          const tipoSolicitacaoCollection: ITipoSolicitacao[] = [{ id: 123 }];
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing(tipoSolicitacaoCollection, ...tipoSolicitacaoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tipoSolicitacao: ITipoSolicitacao = { id: 123 };
          const tipoSolicitacao2: ITipoSolicitacao = { id: 456 };
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing([], tipoSolicitacao, tipoSolicitacao2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tipoSolicitacao);
          expect(expectedResult).toContain(tipoSolicitacao2);
        });

        it('should accept null and undefined values', () => {
          const tipoSolicitacao: ITipoSolicitacao = { id: 123 };
          expectedResult = service.addTipoSolicitacaoToCollectionIfMissing([], null, tipoSolicitacao, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tipoSolicitacao);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
