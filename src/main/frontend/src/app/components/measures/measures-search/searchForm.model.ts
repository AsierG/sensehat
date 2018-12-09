import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class SearchForm {

    public from: NgbDateStruct;
    public timeFrom: NgbTimeStruct;
    public to: NgbDateStruct;
    public timeTo: NgbTimeStruct;

    constructor(fromDate: moment.Moment, toDate: moment.Moment) {
        this.from = {year: fromDate.year(), month: fromDate.month() + 1, day: fromDate.date()};
        this.timeFrom = {hour: fromDate.hour(), minute: fromDate.minute(), second: fromDate.second()};
        this.to = {year: toDate.year(), month: toDate.month() + 1, day: toDate.date()};
        this.timeTo = {hour: toDate.hour(), minute: toDate.minute(), second: toDate.second()};
    }

}
