import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MeasuresService} from "../../../services/measures.service";
import {Measure} from "../measure.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-measure',
    templateUrl: './measure.component.html'
})
export class MeasureComponent implements OnInit {

    measure: Measure;

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