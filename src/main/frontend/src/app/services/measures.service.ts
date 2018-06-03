import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Measure} from "../components/measures/measure.model";
import * as moment from 'moment';

@Injectable()
export class MeasuresService {

    constructor(private httpClient: HttpClient) {
        console.log('MeasuresService initialized');
    }

    getMeasures() {
        return this.httpClient.get('/api/sensehat');
    }

    getMeasuresPrueba(from: moment.Moment, to: moment.Moment) {
        // yyyy-MM-dd
        // let prueba: string = `${from.year()}-${from.month() + 1}-${from.date()}`;
        let prueba = '2018-06-16';
        console.log(prueba);
        return this.httpClient.get(`/api/sensehat/prueba/${prueba}`);
    }

    getMeasure(id: number) {
        return this.httpClient.get(`/api/sensehat/measure/${id}`);
    }

    updateMeasure(measure: Measure) {
        return this.httpClient.put('/api/sensehat/updateMeasure', measure);
    }

}
