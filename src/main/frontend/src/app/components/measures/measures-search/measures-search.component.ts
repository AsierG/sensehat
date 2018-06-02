import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {SearchForm} from "./searchForm.model";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

const now: moment.Moment = moment();
const nowMinusOneWeek: moment.Moment = moment().subtract(7, 'd');

@Component({
    selector: 'app-measures-search',
    templateUrl: './measures-search.component.html'
})
export class MeasuresSearchComponent {

    searchForm: FormGroup;

    constructor() {

        let search: SearchForm = new SearchForm(nowMinusOneWeek, now);
        this.searchForm = new FormGroup({
            'from': new FormControl(null),
            'timeFrom': new FormControl(null),
            'to': new FormControl(null),
            'timeTo': new FormControl(null)
        });
        this.searchForm.controls['from'].setValidators([
            Validators.required,
            this.notValidDates.bind(this.searchForm)
        ]);
        this.searchForm.controls['timeFrom'].setValidators([
            Validators.required,
            this.notValidDates.bind(this.searchForm)
        ]);
        this.searchForm.controls['to'].setValidators([
            Validators.required,
            this.notValidDates.bind(this.searchForm)
        ]);
        this.searchForm.controls['timeTo'].setValidators([
            Validators.required,
            this.notValidDates.bind(this.searchForm)
        ]);
        this.searchForm.setValue(search);
    }

    notValidDates(): { [s: string]: boolean } {

        let form: any = this;

        if (form.controls['from'].value && form.controls['to'].value
            && form.controls['timeFrom'].value && form.controls['timeTo'].value) {
            let fromDate: NgbDateStruct = form.controls['from'].value;
            let timeFrom: NgbTimeStruct = form.controls['timeFrom'].value;
            let toDate: NgbDateStruct = form.controls['to'].value;
            let timeTo: NgbTimeStruct = form.controls['timeTo'].value;
            let fromMoment: moment.Moment = moment()
                .year(fromDate.year).month(fromDate.month - 1).date(fromDate.day)
                .hour(timeFrom.hour).minute(timeFrom.minute).second(timeFrom.second);
            let toMoment: moment.Moment = moment()
                .year(toDate.year).month(toDate.month - 1).date(toDate.day)
                .hour(timeTo.hour).minute(timeTo.minute).second(timeTo.second);
            if (toMoment.isBefore(fromMoment)) {
                return {
                    notValidDates: true
                }
            } else {
                return null;
            }


        }
        return null;
    }

    spinnersFrom = true;
    spinnersTo = true;

    selectToday() {
        this.searchForm.controls['to'].setValue({year: now.year(), month: now.month() + 1, day: now.date()});
        this.searchForm.controls['timeTo'].setValue({hour: now.hour(), minute: now.minute(), second: now.second()});
    }

    toggleSpinnersFrom() {
        this.spinnersFrom = !this.spinnersFrom;
    }

    toggleSpinnersTo() {
        this.spinnersTo = !this.spinnersTo;
    }

    search() {
        console.log(this.searchForm);
    }

}
