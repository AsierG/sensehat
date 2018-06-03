import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

export class DateUtils {

    static getMoment(dateStruct: NgbDateStruct, timeStruct: NgbTimeStruct): moment.Moment {
        let retorno: moment.Moment =
            moment().year(dateStruct.year).month(dateStruct.month - 1).date(dateStruct.day)
                .hour(timeStruct.hour).minute(timeStruct.minute).second(timeStruct.second);
        return retorno;
    }

}
