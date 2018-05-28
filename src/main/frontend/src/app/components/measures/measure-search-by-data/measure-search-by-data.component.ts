import { Component, OnInit } from '@angular/core';
import moment = require("moment");
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import{FormGroup, FormControl, Validators} from "@angular/forms";

const now = new Date();
const nowMinusOneWeek = moment().subtract(7,'d').toDate();

@Component({
  selector: 'app-measure-search-by-data',
  templateUrl: './measure-search-by-data.component.html'
})
export class MeasureSearchByDataComponent implements OnInit {

    from: NgbDateStruct;
    timeFrom: NgbTimeStruct;

    to: NgbDateStruct;
    timeTo: NgbTimeStruct;

    constructor() {
    }

    ngOnInit() {
        this.from =  {year: nowMinusOneWeek.getFullYear(), month: nowMinusOneWeek.getMonth() + 1, day: nowMinusOneWeek.getDate()};
        this.to =  {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.timeFrom= {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
        this.timeTo= {hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds()};
    }

    spinnersFrom = true;
    spinnersTo = true;

    selectToday() {
        this.to = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.timeTo = {hour: now.getHours(), minute: now.getMinutes(), second:now.getSeconds()}
    }


    toggleSpinnersFrom() {
        this.spinnersFrom = !this.spinnersFrom;
    }

    toggleSpinnersTo() {
        this.spinnersTo = !this.spinnersTo;
    }

}
