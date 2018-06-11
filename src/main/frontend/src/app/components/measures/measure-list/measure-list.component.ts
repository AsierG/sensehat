import {Component, Input, OnInit} from '@angular/core';
import {Measure} from "../measure.model";
import {MeasuresService} from "../../../services/measures.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html'
})
export class MeasureListComponent implements OnInit {

    @Input() measures: Measure[] = [];

    constructor(private measuresService: MeasuresService,
                private router: Router) {
        console.log('hemen daude: ' + this.measures);
    }

    ngOnInit() {
        // return this.measuresService.getMeasures()
        //     .subscribe(
        //         (measures: Measure[]) => {
        //             this.measures = measures;
        //         },
        //         (error) => console.log(error)
        //     );
    }

    editMeasure(id: number) {
        this.router.navigate(['/measure', id]);
    }

}
