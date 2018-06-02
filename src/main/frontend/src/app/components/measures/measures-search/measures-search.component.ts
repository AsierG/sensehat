import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {SearchForm} from "./searchForm.model";

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
        this.searchForm.setValue(search);
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
