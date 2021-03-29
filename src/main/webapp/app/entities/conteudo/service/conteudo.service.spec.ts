import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConteudo, Conteudo } from '../conteudo.model';

import { ConteudoService } from './conteudo.service';

describe('Service Tests', () => {
  describe('Conteudo Service', () => {
    let service: ConteudoService;
    let httpMock: HttpTestingController;
    let elemDefault: IConteudo;
    let expectedResult: IConteudo | IConteudo[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ConteudoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        dataAula: currentDate,
        habilidadesCompetencias: 'AAAAAAA',
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

      it('should create a Conteudo', () => {
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

        service.create(new Conteudo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Conteudo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataAula: currentDate.format(DATE_FORMAT),
            habilidadesCompetencias: 'BBBBBB',
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

      it('should partial update a Conteudo', () => {
        const patchObject = Object.assign({}, new Conteudo());

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

      it('should return a list of Conteudo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dataAula: currentDate.format(DATE_FORMAT),
            habilidadesCompetencias: 'BBBBBB',
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

      it('should delete a Conteudo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addConteudoToCollectionIfMissing', () => {
        it('should add a Conteudo to an empty array', () => {
          const conteudo: IConteudo = { id: 123 };
          expectedResult = service.addConteudoToCollectionIfMissing([], conteudo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conteudo);
        });

        it('should not add a Conteudo to an array that contains it', () => {
          const conteudo: IConteudo = { id: 123 };
          const conteudoCollection: IConteudo[] = [
            {
              ...conteudo,
            },
            { id: 456 },
          ];
          expectedResult = service.addConteudoToCollectionIfMissing(conteudoCollection, conteudo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Conteudo to an array that doesn't contain it", () => {
          const conteudo: IConteudo = { id: 123 };
          const conteudoCollection: IConteudo[] = [{ id: 456 }];
          expectedResult = service.addConteudoToCollectionIfMissing(conteudoCollection, conteudo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conteudo);
        });

        it('should add only unique Conteudo to an array', () => {
          const conteudoArray: IConteudo[] = [{ id: 123 }, { id: 456 }, { id: 46865 }];
          const conteudoCollection: IConteudo[] = [{ id: 123 }];
          expectedResult = service.addConteudoToCollectionIfMissing(conteudoCollection, ...conteudoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const conteudo: IConteudo = { id: 123 };
          const conteudo2: IConteudo = { id: 456 };
          expectedResult = service.addConteudoToCollectionIfMissing([], conteudo, conteudo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conteudo);
          expect(expectedResult).toContain(conteudo2);
        });

        it('should accept null and undefined values', () => {
          const conteudo: IConteudo = { id: 123 };
          expectedResult = service.addConteudoToCollectionIfMissing([], null, conteudo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conteudo);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
