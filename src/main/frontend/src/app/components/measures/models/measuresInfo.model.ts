import {Statistics} from './statistics.model';
import {Measure} from './measure.model';

export class MeasuresInfo {

    public measures: Array<Measure> = [];
    public dates: Array<string> = [];
    public temperatureStatistics: Array<Statistics> = [];
    public pressureStatistics: Array<Statistics> = [];
    public humidityStatistics: Array<Statistics> = [];

    constructor(measures: Array<Measure>,
                dates: Array<string>,
                temperatureStatistics: Array<Statistics>,
                pressureStatistics: Array<Statistics>,
                humidityStatistics: Array<Statistics>) {
        this.measures = measures;
        this.dates = dates;
        this.temperatureStatistics = temperatureStatistics;
        this.pressureStatistics = pressureStatistics;
        this.humidityStatistics = humidityStatistics;
    }

}
