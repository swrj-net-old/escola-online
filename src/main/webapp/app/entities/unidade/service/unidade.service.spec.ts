import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUnidade, Unidade } from '../unidade.model';

import { UnidadeService } from './unidade.service';

describe('Service Tests', () => {
  describe('Unidade Service', () => {
    let service: UnidadeService;
    let httpMock: HttpTestingController;
    let elemDefault: IUnidade;
    let expectedResult: IUnidade | IUnidade[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(UnidadeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        cnpj: 'AAAAAAA',
        endereco: 'AAAAAAA',
        complemento: 'AAAAAAA',
        bairro: 'AAAAAAA',
        cidade: 'AAAAAAA',
        cep: 'AAAAAAA',
        telefoneComercial: 'AAAAAAA',
        telefoneWhatsapp: 'AAAAAAA',
        email: 'AAAAAAA',
        facebook: 'AAAAAAA',
        observacoes: 'AAAAAAA',
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

      it('should create a Unidade', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Unidade()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Unidade', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            cnpj: 'BBBBBB',
            endereco: 'BBBBBB',
            complemento: 'BBBBBB',
            bairro: 'BBBBBB',
            cidade: 'BBBBBB',
            cep: 'BBBBBB',
            telefoneComercial: 'BBBBBB',
            telefoneWhatsapp: 'BBBBBB',
            email: 'BBBBBB',
            facebook: 'BBBBBB',
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Unidade', () => {
        const patchObject = Object.assign(
          {
            nome: 'BBBBBB',
            cnpj: 'BBBBBB',
            complemento: 'BBBBBB',
            cep: 'BBBBBB',
            telefoneWhatsapp: 'BBBBBB',
            facebook: 'BBBBBB',
          },
          new Unidade()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Unidade', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            cnpj: 'BBBBBB',
            endereco: 'BBBBBB',
            complemento: 'BBBBBB',
            bairro: 'BBBBBB',
            cidade: 'BBBBBB',
            cep: 'BBBBBB',
            telefoneComercial: 'BBBBBB',
            telefoneWhatsapp: 'BBBBBB',
            email: 'BBBBBB',
            facebook: 'BBBBBB',
            observacoes: 'BBBBBB',
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

      it('should delete a Unidade', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addUnidadeToCollectionIfMissing', () => {
        it('should add a Unidade to an empty array', () => {
          const unidade: IUnidade = { id: 123 };
          expectedResult = service.addUnidadeToCollectionIfMissing([], unidade);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(unidade);
        });

        it('should not add a Unidade to an array that contains it', () => {
          const unidade: IUnidade = { id: 123 };
          const unidadeCollection: IUnidade[] = [
            {
              ...unidade,
            },
            { id: 456 },
          ];
          expectedResult = service.addUnidadeToCollectionIfMissing(unidadeCollection, unidade);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Unidade to an array that doesn't contain it", () => {
          const unidade: IUnidade = { id: 123 };
          const unidadeCollection: IUnidade[] = [{ id: 456 }];
          expectedResult = service.addUnidadeToCollectionIfMissing(unidadeCollection, unidade);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(unidade);
        });

        it('should add only unique Unidade to an array', () => {
          const unidadeArray: IUnidade[] = [{ id: 123 }, { id: 456 }, { id: 96772 }];
          const unidadeCollection: IUnidade[] = [{ id: 123 }];
          expectedResult = service.addUnidadeToCollectionIfMissing(unidadeCollection, ...unidadeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const unidade: IUnidade = { id: 123 };
          const unidade2: IUnidade = { id: 456 };
          expectedResult = service.addUnidadeToCollectionIfMissing([], unidade, unidade2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(unidade);
          expect(expectedResult).toContain(unidade2);
        });

        it('should accept null and undefined values', () => {
          const unidade: IUnidade = { id: 123 };
          expectedResult = service.addUnidadeToCollectionIfMissing([], null, unidade, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(unidade);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
