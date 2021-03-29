import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DiretorService } from 'app/entities/diretor/diretor.service';
import { IDiretor, Diretor } from 'app/shared/model/diretor.model';

describe('Service Tests', () => {
  describe('Diretor Service', () => {
    let injector: TestBed;
    let service: DiretorService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiretor;
    let expectedResult: IDiretor | IDiretor[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DiretorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Diretor(0, 0, currentDate, currentDate);
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

      it('should return a list of Diretor', () => {
        const returnedFromService = Object.assign(
          {
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
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
