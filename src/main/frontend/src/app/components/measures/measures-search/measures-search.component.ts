import {Component, OnInit} from '@angular/core';
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-measures-search',
    templateUrl: './measures-search.component.html'
})
export class MeasuresSearchComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {
    }


    timeFrom = {hour: 13, minute: 30};
    timeTo = {hour: 15, minute: 40};

    spinnersFrom = true;
    spinnersTo = true;

    toggleSpinnersFrom() {
        this.spinnersFrom = !this.spinnersFrom;
    }

    toggleSpinnersTo() {
        this.spinnersTo = !this.spinnersTo;
    }

}
