import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Measure} from "../components/measures/measure.model";

@Injectable()
export class MeasuresService {

    constructor(private httpClient: HttpClient) {
        console.log('MeasuresService initialized');
    }

    getMeasures() {
        return this.httpClient.get('/api/sensehat');
    }

    getMeasure(id: number) {
        return this.httpClient.get(`/api/sensehat/measure/${id}`);
    }

    updateMeasure(measure: Measure) {
        return this.httpClient.put('/api/sensehat/updateMeasure', measure);
    }

}
