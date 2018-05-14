import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MeasuresService} from "../../../services/measures.service";
import {Measure} from "../measure.model";
import {NgForm} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

const now = new Date();

@Component({
    selector: 'app-measure',
    templateUrl: './measure.component.html'
})
export class MeasureComponent implements OnInit {

    measure: Measure;


    model: NgbDateStruct;
    date: {year: number, month: number};

    selectToday() {
        this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    }

    fromModel(date: Date): NgbDateStruct {
        return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
    }

    toModel(date: NgbDateStruct): Date {
        return date ? new Date(date.year, date.month - 1, date.day) : null;
    }


    constructor(private activatedRoute: ActivatedRoute,
                private measuresService: MeasuresService) {

        this.activatedRoute.params.subscribe(params => {
            return this.measuresService.getMeasure(params['id'])
                .subscribe(
                    (measure: Measure) => {
                        this.measure = measure;
                    },
                    (error) => console.log(error)
                );
        });

    }

    ngOnInit() {
    }

    update(measureForm: NgForm) {
        console.log("measureForm Value: " + measureForm.value);
        console.log("measure: " + this.measure);

        this.measuresService.updateMeasure(this.measure)
            .subscribe(updatedMeasure => {
                alert("Measure updated successfully.");
                console.log('updatedMeasure ' + updatedMeasure);
            });

    }



}
