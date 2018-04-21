import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MeasuresService {

    constructor(private httpClient: HttpClient) {
        console.log('MeasuresService initialized');
    }

    getMeasures() {
        return this.httpClient.get('/api/sensehat');
    }

    getMeasure(id: number) {
        console.log(`id: ${id}`);
        return this.httpClient.get('/api/sensehat/measure');
    }

}
