import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Measure} from '../models/measure.model';
import {MeasuresService} from '../../../services/measures.service';

@Component({
    selector: 'app-measure-by-data',
    templateUrl: './measure-by-data.component.html'
})
export class MeasureByDataComponent {

    measure: Measure;
    measureForm: FormGroup;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private measuresService: MeasuresService) {

        this.measureForm = new FormGroup({
            'id': new FormControl(null),
            'temperatureFromHumidity': new FormControl(null),
            'temperatureFromCpu': new FormControl(null),
            'temperatureFromPressure': new FormControl(null),
            'date': new FormControl(null),
            // 'yearMonthDay': new FormControl(null),
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

    update(measureForm: NgForm) {
        this.measuresService.updateMeasure(measureForm.value)
            .subscribe(updatedMeasure => {
                console.log('updatedMeasure ' + updatedMeasure);
            });
        this.router.navigate(['/home']);
    }

}
