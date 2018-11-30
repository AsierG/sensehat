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
    private temperatures: Array<number> = [];
    private temperaturesChart = [];

    ngOnChanges(changes: SimpleChanges): void {
        const currentMeasures = <Measure[]> changes.measures.currentValue;
        const weatherDays: Array<string> = [];
        if (currentMeasures.length > 0) {
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, 'DD-MM-YYYY'));
            this.temperatures = currentMeasures
                .map((measure) => Math.round(measure.temperature * 100) / 100);
            this.dates.forEach(date => {
                weatherDays.push(date.format('MMMM Do YYYY'));
            });

            this.temperaturesChart = this.getTemperaturesChart(weatherDays,
                this.temperatures, this.temperatures, this.temperatures);

        }
    }


    private getTemperaturesChart(weatherDays: Array<string>,
                                 maxValues: Array<number>,
                                 meanValues: Array<number>,
                                 minValues: Array<number>) {
        return new Chart('canvas', {
            type: 'bar',
            data: {
                labels: weatherDays,
                datasets: [
                    {
                        label: 'Max',
                        data: maxValues,
                        backgroundColor: '#F78181',
                        fill: false
                    },
                    {
                        label: 'Avg',
                        data: meanValues,
                        backgroundColor: '#04B45F',
                        fill: false
                    },
                    {
                        label: 'Min',
                        data: minValues,
                        backgroundColor: '#2E9AFE',
                        fill: false
                    }
                ]
            },
            options: {
                legend: {
                    display: true
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return new Intl.NumberFormat('es-es',
                                {minimumFractionDigits: 2}).format(tooltipItem.yLabel);
                        }
                    }
                },
                scales: {
                    xAxes: [
                        {
                            display: true
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                callback: function (value) {
                                    return new Intl.NumberFormat('es-es',
                                        {minimumFractionDigits: 2}).format(value);
                                },
                            }
                        }
                    ]
                }
            }
        });
    }
}
