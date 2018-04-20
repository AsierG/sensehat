import {Component, OnInit} from '@angular/core';
import {Measure} from "../measure.model";
import {MeasuresService} from "../../../services/measures.service";

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html',
    styleUrls: ['./measure-list.component.css']
})
export class MeasureListComponent implements OnInit {

    measures: Measure[] = [];

    constructor(private measuresService: MeasuresService) {
    }

    ngOnInit() {
        return this.measuresService.getMeasures()
            .subscribe(
                (measures: Measure[]) => {
                    this.measures = measures;
                },
                (error) => console.log(error)
            );
    }

}
