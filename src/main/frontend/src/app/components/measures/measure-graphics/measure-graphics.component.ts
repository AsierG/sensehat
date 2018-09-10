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
      "rangeSelector" : {
            "selected" : 100
        },
        "title": {
            "text": "CPU Temperature Raspberry Pi"
        },
        "xAxis": {
            "type": "datetime",
            "tickPixelInterval": 150,
            "maxZoom": 20000
        },
        "yAxis": {
            "minPadding": 0.2,
            "maxPadding": 0.2,
            "title": {
                "text": "Temperature ºC",
                "margin": 80
            }
        },
        "series": [{
            "name": "Temperature",
            "data": [98777, 4]
        }]
  }
  `;

    optFromInput = JSON.parse(this.optFromInputString);
    updateFromInput = false;

    optPrueba = {
        "rangeSelector": {
            "selected": 100
        },
        "title": {
            "text": "CPU Temperature Raspberry Pi"
        },
        "xAxis": {
            "type": "datetime",
            "tickPixelInterval": 150,
            "maxZoom": 20000
        },
        "yAxis": {
            "minPadding": 0.2,
            "maxPadding": 0.2,
            "title": {
                "text": "Temperature ºC",
                "margin": 80
            }
        },
        "series": [{
            "name": "Temperature",
            "data": [
                {x: Date.UTC(2014, 0, 1), y: 50},
                {x: Date.UTC(2014, 2, 1), y: 20}
            ]
        }]
    };

    updateInputChart() {
        this.optFromInput = JSON.parse(this.optFromInputString);
    }

    seriesTypes: { [key: string]: string } = {
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

        var prueba: any[] = [];

        if (currentMeasures.length > 0) {
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, "DD-MM-YYYY HH:mm:ss"));
            this.temperatures = currentMeasures
                .map((measure) => measure.temperature);

            currentMeasures
                .map((measure) => prueba.push(
                    {x: moment(measure.date, "DD-MM-YYYY HH:mm:ss").valueOf(),
                        y: measure.temperature})
                );
            console.log('PRUEBA ' + prueba);

            this.optPrueba.series = prueba;



        }
    }


}
