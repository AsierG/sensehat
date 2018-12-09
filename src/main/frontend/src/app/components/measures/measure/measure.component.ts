import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MeasuresService} from '../../../services/measures.service';
import {Measure} from '../models/measure.model';

@Component({
    selector: 'app-measure',
    templateUrl: './measure.component.html'
})
export class MeasureComponent {

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

    update() {
        this.measuresService.updateMeasure(this.measure)
            .subscribe(updatedMeasure => {
                console.log('updatedMeasure ' + updatedMeasure);
            });
    }

}
