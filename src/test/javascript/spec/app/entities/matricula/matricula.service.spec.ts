import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MatriculaService } from 'app/entities/matricula/matricula.service';
import { IMatricula, Matricula } from 'app/shared/model/matricula.model';

describe('Service Tests', () => {
  describe('Matricula Service', () => {
    let injector: TestBed;
    let service: MatriculaService;
    let httpMock: HttpTestingController;
    let elemDefault: IMatricula;
    let expectedResult: IMatricula | IMatricula[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MatriculaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Matricula(0, 0, currentDate, currentDate);
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

      it('should create a Matricula', () => {
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

        service.create(new Matricula()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Matricula', () => {
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

      it('should return a list of Matricula', () => {
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

      it('should delete a Matricula', () => {
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
