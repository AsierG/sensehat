import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import {SearchForm} from "./searchForm.model";
import {MeasuresService} from "../../../services/measures.service";
import {Measure} from "../measure.model";
import {DateUtils} from "../../shared/date-utils.component";

const now: moment.Moment = moment();
const nowMinusOneWeek: moment.Moment = moment().subtract(7, 'd');

@Component({
    selector: 'app-measures-search',
    templateUrl: './measures-search.component.html'
})
export class MeasuresSearchComponent {

    searchForm: FormGroup;
    measures: Measure[] = [];

    constructor(private measuresService: MeasuresService) {

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

        this.searchForm.valueChanges
            .subscribe(data => {
                if (this.searchForm.valid) {
                    let from: moment.Moment = DateUtils.getMoment(this.searchForm.controls['from'].value,
                        this.searchForm.controls['timeFrom'].value);
                    let to: moment.Moment = DateUtils.getMoment(this.searchForm.controls['to'].value,
                        this.searchForm.controls['timeTo'].value);
                    this.getMeasures(from, to);
                } else {
                    this.measures = [];
                }
            });

    }

    getMeasures(from: moment.Moment, to: moment.Moment) {
        this.measuresService.getMeasuresBetweenDates(from, to)
            .subscribe(
                (measures: Measure[]) => {
                    this.measures = measures;
                    console.log(this.measures);
                },
                (error) => console.log(error)
            );
    }

    notValidDates(): { [s: string]: boolean } {

        let form: any = this;

        if (form.controls['from'].value && form.controls['to'].value
            && form.controls['timeFrom'].value && form.controls['timeTo'].value) {
            let fromMoment: moment.Moment = DateUtils.getMoment(form.controls['from'].value,
                form.controls['timeFrom'].value);
            let toMoment: moment.Moment = DateUtils.getMoment(form.controls['to'].value,
                form.controls['timeTo'].value);
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
