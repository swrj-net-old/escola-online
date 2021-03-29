import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDiretor, Diretor } from '../diretor.model';

import { DiretorService } from './diretor.service';

describe('Service Tests', () => {
  describe('Diretor Service', () => {
    let service: DiretorService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiretor;
    let expectedResult: IDiretor | IDiretor[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DiretorService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        anoLetivo: 0,
        dataInicio: currentDate,
        dataFim: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataInicio: currentDate.format(DATE_FORMAT),
            dataFim: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Diretor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataInicio: currentDate.format(DATE_FORMAT),
            dataFim: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataInicio: currentDate,
            dataFim: currentDate,
          },
          returnedFromService
        );

        service.create(new Diretor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Diretor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            anoLetivo: 1,
            dataInicio: currentDate.format(DATE_FORMAT),
            dataFim: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataInicio: currentDate,
            dataFim: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Diretor', () => {
        const patchObject = Object.assign(
          {
            dataInicio: currentDate.format(DATE_FORMAT),
            dataFim: currentDate.format(DATE_FORMAT),
          },
          new Diretor()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataInicio: currentDate,
            dataFim: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Diretor', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            anoLetivo: 1,
            dataInicio: currentDate.format(DATE_FORMAT),
            dataFim: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataInicio: currentDate,
            dataFim: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Diretor', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDiretorToCollectionIfMissing', () => {
        it('should add a Diretor to an empty array', () => {
          const diretor: IDiretor = { id: 123 };
          expectedResult = service.addDiretorToCollectionIfMissing([], diretor);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diretor);
        });

        it('should not add a Diretor to an array that contains it', () => {
          const diretor: IDiretor = { id: 123 };
          const diretorCollection: IDiretor[] = [
            {
              ...diretor,
            },
            { id: 456 },
          ];
          expectedResult = service.addDiretorToCollectionIfMissing(diretorCollection, diretor);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Diretor to an array that doesn't contain it", () => {
          const diretor: IDiretor = { id: 123 };
          const diretorCollection: IDiretor[] = [{ id: 456 }];
          expectedResult = service.addDiretorToCollectionIfMissing(diretorCollection, diretor);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diretor);
        });

        it('should add only unique Diretor to an array', () => {
          const diretorArray: IDiretor[] = [{ id: 123 }, { id: 456 }, { id: 91712 }];
          const diretorCollection: IDiretor[] = [{ id: 123 }];
          expectedResult = service.addDiretorToCollectionIfMissing(diretorCollection, ...diretorArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const diretor: IDiretor = { id: 123 };
          const diretor2: IDiretor = { id: 456 };
          expectedResult = service.addDiretorToCollectionIfMissing([], diretor, diretor2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diretor);
          expect(expectedResult).toContain(diretor2);
        });

        it('should accept null and undefined values', () => {
          const diretor: IDiretor = { id: 123 };
          expectedResult = service.addDiretorToCollectionIfMissing([], null, diretor, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diretor);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
