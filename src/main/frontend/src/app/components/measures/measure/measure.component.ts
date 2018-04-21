import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MeasuresService} from "../../../services/measures.service";

@Component({
    selector: 'app-measure',
    templateUrl: './measure.component.html'
})
export class MeasureComponent implements OnInit {

    measure: Measure;
    // measure: any = {};

    constructor(private activatedRoute: ActivatedRoute,
                private measuresService: MeasuresService) {

        this.activatedRoute.params.subscribe(params => {
            // this.measure = this.measuresService.getMeasure(params['id']);
            // if(this.measure){
            //     console.log('controler' + this.measure);
            // }else{
            //     console.log('null');
            // }

            this.measuresService.getMeasure(this.id)
                .subscribe(measure => this.measure = measure);

        });

    }

    ngOnInit() {
    }

}
