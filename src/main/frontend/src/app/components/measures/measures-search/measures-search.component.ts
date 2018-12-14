import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {SearchForm} from './searchForm.model';
import {MeasuresService} from '../../../services/measures.service';
import {DateUtils} from '../../shared/date-utils.component';
import {MeasuresInfo} from '../models/measuresInfo.model';

const now: moment.Moment = moment();
const nowMinusOneWeek: moment.Moment = moment().subtract(7, 'd');

@Component({
    selector: 'app-measures-search',
    templateUrl: './measures-search.component.html'
})
export class MeasuresSearchComponent implements OnInit {

    searchForm: FormGroup;
    measureInfo: MeasuresInfo;
    spinnersFrom = true;
    spinnersTo = true;


    ngOnInit(): void {
        if (this.searchForm.valid) {
            this.searchMeasures();
        }
    }

    constructor(private measuresService: MeasuresService) {

        const search: SearchForm = new SearchForm(nowMinusOneWeek, now);
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
                    this.searchMeasures();
                } else {
                    this.measureInfo.measures = [];
                }
            });
    }

    private searchMeasures() {
        const from: moment.Moment = DateUtils.getMoment(this.searchForm.controls['from'].value,
            this.searchForm.controls['timeFrom'].value);
        const to: moment.Moment = DateUtils.getMoment(this.searchForm.controls['to'].value,
            this.searchForm.controls['timeTo'].value);
        this.getMeasures(from, to);
    }

    getMeasures(from: moment.Moment, to: moment.Moment) {
        this.measuresService.getMeasuresBetweenDates(from, to)
            .subscribe(
                (measureInfo: MeasuresInfo) => {
                    this.measureInfo = measureInfo;
                },
                (error) => console.log(error)
            );
    }

    notValidDates(): { [s: string]: boolean } {
        const form: any = this;
        if (form.controls['from'].value && form.controls['to'].value
            && form.controls['timeFrom'].value && form.controls['timeTo'].value) {
            const fromMoment: moment.Moment = DateUtils.getMoment(form.controls['from'].value,
                form.controls['timeFrom'].value);
            const toMoment: moment.Moment = DateUtils.getMoment(form.controls['to'].value,
                form.controls['timeTo'].value);
            if (toMoment.isBefore(fromMoment)) {
                return {
                    notValidDates: true
                };
            } else {
                return null;
            }
        }
        return null;
    }

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
