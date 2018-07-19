import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Measure} from "../measure.model";
import * as moment from 'moment';
import {Chart} from 'chart.js';

import * as Highcharts from 'highcharts/highstock';

@Component({
    selector: 'app-measure-graphics',
    templateUrl: './measure-graphics.component.html'
})
export class MeasureGraphicsComponent implements OnChanges {

    @Input() measures: Measure[];

    public dates: Array<any> = [];
    public temperatures: Array<Number> = [];

    // For all demos:
    Highcharts = Highcharts;

    // Demo #1
    optFromInputString = `
  {
    "subtitle": { "text": "Highcharts chart" },
    "series": [{
      "type": "line",
      "data": [11,2,3]
    }, {
      "data": [5,6,7]
    }]
  }
  `;

    optFromInput = JSON.parse(this.optFromInputString);
    updateFromInput = false;

    updateInputChart() {
        this.optFromInput = JSON.parse(this.optFromInputString);
    }

    seriesTypes: {[key: string]: string} = {
        line: 'column',
        column: 'scatter',
        scatter: 'spline',
        spline: 'line'
    };

    toggleSeriesType(index = 0) {
        this.optFromInput.series[index].type = this.seriesTypes[this.optFromInput.series[index].type];
        // nested change - must trigger update
        this.updateFromInput = true;
    }

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentMeasures = <Measure[]> changes.measures.currentValue;
        if (currentMeasures.length > 0) {
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, "DD-MM-YYYY HH:mm:ss"));
            this.temperatures = currentMeasures
                .map((measure) => measure.temperature);
        }
    }



}
