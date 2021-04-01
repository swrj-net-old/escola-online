import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ProfessorService } from 'app/entities/professor/professor.service';
import { IProfessor, Professor } from 'app/shared/model/professor.model';

describe('Service Tests', () => {
  describe('Professor Service', () => {
    let injector: TestBed;
    let service: ProfessorService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfessor;
    let expectedResult: IProfessor | IProfessor[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProfessorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Professor(0, 0, currentDate, currentDate);
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

      it('should create a Professor', () => {
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

        service.create(new Professor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Professor', () => {
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

      it('should return a list of Professor', () => {
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

      it('should delete a Professor', () => {
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
