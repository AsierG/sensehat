import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';
import {MeasuresInfo} from "../models/measuresInfo.model";

// import {Moment} from 'moment';

@Component({
    selector: 'app-measure-graphics',
    templateUrl: './measure-graphics.component.html',
    styleUrls: ['./measure-graphics.component.css']
})
export class MeasureGraphicsComponent implements OnChanges {

    @Input() measureInfo: MeasuresInfo;

    private temperaturesMax: Array<number> = [];
    private temperaturesMin: Array<number> = [];
    private temperaturesAvg: Array<number> = [];
    private temperaturesChart = [];

    ngOnChanges(changes: SimpleChanges): void {
        const currentMeasureInfo = <MeasuresInfo> changes.measureInfo.currentValue;
        if (currentMeasureInfo) {
            this.temperaturesMax = currentMeasureInfo.temperatureStatistics
                .map((temperatureStatistics) => Math.round(temperatureStatistics.max * 100) / 100);
            this.temperaturesMin = currentMeasureInfo.temperatureStatistics
                .map((temperatureStatistics) => Math.round(temperatureStatistics.min * 100) / 100);
            this.temperaturesAvg = currentMeasureInfo.temperatureStatistics
                .map((temperatureStatistics) => Math.round(temperatureStatistics.avg * 100) / 100);
            this.temperaturesChart = this.getTemperaturesChart(currentMeasureInfo.dates,
                this.temperaturesMax, this.temperaturesMin, this.temperaturesAvg);

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
