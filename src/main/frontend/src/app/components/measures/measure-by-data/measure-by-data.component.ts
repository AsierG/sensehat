import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Measure} from "../measure.model";
import {MeasuresService} from "../../../services/measures.service";

@Component({
    selector: 'app-measure-by-data',
    templateUrl: './measure-by-data.component.html'
})
export class MeasureByDataComponent implements OnInit {

    measure: Measure;

    measureForm: FormGroup;

    constructor(private activatedRoute: ActivatedRoute,
                private measuresService: MeasuresService) {

        this.measureForm = new FormGroup({

            'id': new FormControl(null),
            'temperatureFromHumidity': new FormControl(null),
            'temperatureFromCpu': new FormControl(null),
            'temperatureFromPressure': new FormControl(null),
            'date': new FormControl(null),

            'temperature': new FormControl(null,
                [Validators.required,
                    Validators.min(-10),
                    Validators.max(100)
                ]),
            'humidity': new FormControl(null,
                [Validators.required,
                    Validators.min(0),
                    Validators.max(100)]
            ),
            'pressure': new FormControl(null,
                [Validators.required,
                    Validators.min(900),
                    Validators.max(1100)
                ])
        });


        this.activatedRoute.params.subscribe(params => {
            return this.measuresService.getMeasure(params['id'])
                .subscribe(
                    (measure: Measure) => {
                        this.measure = measure;
                        this.measureForm.setValue(this.measure);
                    },
                    (error) => console.log(error)
                );
        });



    }

    ngOnInit() {
    }

    update() {
        console.log(this.measureForm.value);

        this.measureForm.reset({
            'id': null,
            'temperatureFromHumidity': null,
            'temperatureFromCpu': null,
            'temperatureFromPressure': null,
            'date': null,
            'temperature': 25,
            'humidity': 50,
            'pressure': 1000
        });
        // console.log("measureForm Value: " + measureForm.value);
        // console.log("measure: " + this.measure);
        //
        // this.measuresService.updateMeasure(this.measure)
        //     .subscribe(updatedMeasure => {
        //         // alert("Measure updated successfully.");
        //         console.log('updatedMeasure ' + updatedMeasure);
        //     });

    }


}
