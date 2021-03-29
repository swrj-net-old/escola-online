import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEscola, Escola } from '../escola.model';

import { EscolaService } from './escola.service';

describe('Service Tests', () => {
  describe('Escola Service', () => {
    let service: EscolaService;
    let httpMock: HttpTestingController;
    let elemDefault: IEscola;
    let expectedResult: IEscola | IEscola[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EscolaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        razaoSocial: 'AAAAAAA',
        cnpjPrincipal: 'AAAAAAA',
        url: 'AAAAAAA',
        prefixo: 'AAAAAAA',
        responsavelNome: 'AAAAAAA',
        responsavelCpf: 'AAAAAAA',
        responsavelEmail: 'AAAAAAA',
        responsavelCelular: 'AAAAAAA',
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

      it('should create a Escola', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Escola()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Escola', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            razaoSocial: 'BBBBBB',
            cnpjPrincipal: 'BBBBBB',
            url: 'BBBBBB',
            prefixo: 'BBBBBB',
            responsavelNome: 'BBBBBB',
            responsavelCpf: 'BBBBBB',
            responsavelEmail: 'BBBBBB',
            responsavelCelular: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Escola', () => {
        const patchObject = Object.assign(
          {
            razaoSocial: 'BBBBBB',
            responsavelEmail: 'BBBBBB',
          },
          new Escola()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Escola', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            razaoSocial: 'BBBBBB',
            cnpjPrincipal: 'BBBBBB',
            url: 'BBBBBB',
            prefixo: 'BBBBBB',
            responsavelNome: 'BBBBBB',
            responsavelCpf: 'BBBBBB',
            responsavelEmail: 'BBBBBB',
            responsavelCelular: 'BBBBBB',
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

      it('should delete a Escola', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEscolaToCollectionIfMissing', () => {
        it('should add a Escola to an empty array', () => {
          const escola: IEscola = { id: 123 };
          expectedResult = service.addEscolaToCollectionIfMissing([], escola);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(escola);
        });

        it('should not add a Escola to an array that contains it', () => {
          const escola: IEscola = { id: 123 };
          const escolaCollection: IEscola[] = [
            {
              ...escola,
            },
            { id: 456 },
          ];
          expectedResult = service.addEscolaToCollectionIfMissing(escolaCollection, escola);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Escola to an array that doesn't contain it", () => {
          const escola: IEscola = { id: 123 };
          const escolaCollection: IEscola[] = [{ id: 456 }];
          expectedResult = service.addEscolaToCollectionIfMissing(escolaCollection, escola);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(escola);
        });

        it('should add only unique Escola to an array', () => {
          const escolaArray: IEscola[] = [{ id: 123 }, { id: 456 }, { id: 99160 }];
          const escolaCollection: IEscola[] = [{ id: 123 }];
          expectedResult = service.addEscolaToCollectionIfMissing(escolaCollection, ...escolaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const escola: IEscola = { id: 123 };
          const escola2: IEscola = { id: 456 };
          expectedResult = service.addEscolaToCollectionIfMissing([], escola, escola2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(escola);
          expect(expectedResult).toContain(escola2);
        });

        it('should accept null and undefined values', () => {
          const escola: IEscola = { id: 123 };
          expectedResult = service.addEscolaToCollectionIfMissing([], null, escola, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(escola);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
