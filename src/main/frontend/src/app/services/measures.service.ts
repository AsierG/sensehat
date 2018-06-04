import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Measure} from "../components/measures/measure.model";
import * as moment from 'moment';
import {DateUtils} from "../components/shared/date-utils.component";

@Injectable()
export class MeasuresService {

    constructor(private httpClient: HttpClient) {
        console.log('MeasuresService initialized');
    }

    getMeasures() {
        return this.httpClient.get('/api/sensehat');
    }

    getMeasuresBetweenDates(from: moment.Moment, to: moment.Moment) {
        let fromString: string = DateUtils.getDateAsString(from);
        let toString: string = DateUtils.getDateAsString(to);
        return this.httpClient.get(`/api/sensehat/measures/${fromString}/${toString}`);
    }

    getMeasure(id: number) {
        return this.httpClient.get(`/api/sensehat/measure/${id}`);
    }

    updateMeasure(measure: Measure) {
        return this.httpClient.put('/api/sensehat/updateMeasure', measure);
    }

}
