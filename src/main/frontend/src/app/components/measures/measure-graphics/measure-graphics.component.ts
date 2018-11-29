import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Measure} from '../measure.model';
import {Chart} from 'chart.js';
import * as moment from 'moment';
import {Moment} from 'moment';

// import {Moment} from 'moment';

@Component({
    selector: 'app-measure-graphics',
    templateUrl: './measure-graphics.component.html',
    styleUrls: ['./measure-graphics.component.css']
})
export class MeasureGraphicsComponent implements OnChanges {

    @Input() measures: Measure[];

    private dates: Array<Moment> = [];
    private temperatures: Array<Number> = [];

    private chart = [];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };


    ngOnChanges(changes: SimpleChanges): void {

        const currentMeasures = <Measure[]> changes.measures.currentValue;
        const weahterDays = [];

        if (currentMeasures.length > 0) {
            console.log('currentMeasures ' + currentMeasures.length);
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, 'DD-MM-YYYY'));
            this.temperatures = currentMeasures
                .map((measure) => Math.round(measure.temperature * 100) / 100);
            this.dates.forEach(date => {
                weahterDays.push(date.format('MMMM Do YYYY'));
            });

            this.chart = new Chart('canvas', {
                type: 'bar',
                data: {
                    labels: weahterDays,
                    datasets: [
                        {
                            label: 'Max',
                            data: this.temperatures,
                            backgroundColor: '#F78181',
                            fill: false
                        },
                        {
                            label: "Min",
                            data: this.temperatures,
                            backgroundColor: '#2E9AFE',
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true
                            }
                        ],
                        yAxes: [
                            {
                                display: true
                            }
                        ]
                    }
                }
            });

        }

        console.log('weahterDays ' + weahterDays);

    }


}
