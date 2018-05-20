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


    time = {hour: 13, minute: 30};

    spinners = true;

    toggleSpinners() {
        this.spinners = !this.spinners;
    }

}
