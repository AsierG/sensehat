import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

export class DateUtils {

    static getMoment(dateStruct: NgbDateStruct, timeStruct: NgbTimeStruct): moment.Moment {
        return moment().year(dateStruct.year).month(dateStruct.month - 1).date(dateStruct.day)
            .hour(timeStruct.hour).minute(timeStruct.minute).second(timeStruct.second);
    }

    static getDateAsString(momentDate: moment.Moment): string {
        let year: string = DateUtils.normalizeToString(momentDate.year());
        let month: string = DateUtils.normalizeToString(momentDate.month() + 1);
        let day: string = DateUtils.normalizeToString(momentDate.date());

        let hour: string = DateUtils.normalizeToString(momentDate.hour());
        let minute: string = DateUtils.normalizeToString(momentDate.minute());
        let second: string = DateUtils.normalizeToString(momentDate.second());

        return `${day}-${month}-${year}_${hour}:${minute}:${second}`;
    }

    static normalizeToString(value: number): string {
        let data: string;
        if (value < 10) {
            data = '0' + value;
        } else {
            data = '' + value;
        }
        return data;
    }


}
