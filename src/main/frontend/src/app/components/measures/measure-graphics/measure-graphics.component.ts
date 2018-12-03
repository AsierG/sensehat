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

    private temperaturesChart = [];
    private pressureChart = [];
    private humidityChart = [];

    ngOnChanges(changes: SimpleChanges): void {
        const currentMeasureInfo = <MeasuresInfo> changes.measureInfo.currentValue;
        if (currentMeasureInfo) {
            this.createTemperaturesChart(currentMeasureInfo);
            this.createPressureChart(currentMeasureInfo);
            this.createHumidityChart(currentMeasureInfo);
        }
    }

    private createTemperaturesChart(currentMeasureInfo) {
        const temperaturesMax: Array<number> = currentMeasureInfo.temperatureStatistics
            .map((temperatureStatistics) => Math.round(temperatureStatistics.max * 100) / 100);
        const temperaturesMin: Array<number> = currentMeasureInfo.temperatureStatistics
            .map((temperatureStatistics) => Math.round(temperatureStatistics.min * 100) / 100);
        const temperaturesAvg: Array<number> = currentMeasureInfo.temperatureStatistics
            .map((temperatureStatistics) => Math.round(temperatureStatistics.avg * 100) / 100);
        this.temperaturesChart = this.getTemperaturesChart('Temperatures', 'temperatureCanvas', currentMeasureInfo.dates,
            temperaturesMax, temperaturesMin, temperaturesAvg);
    }

    private createPressureChart(currentMeasureInfo) {
        const pressureMax: Array<number> = currentMeasureInfo.pressureStatistics
            .map((pressureStatistics) => Math.round(pressureStatistics.max * 100) / 100);
        const pressureMin: Array<number> = currentMeasureInfo.pressureStatistics
            .map((pressureStatistics) => Math.round(pressureStatistics.min * 100) / 100);
        const pressureAvg: Array<number> = currentMeasureInfo.pressureStatistics
            .map((pressureStatistics) => Math.round(pressureStatistics.avg * 100) / 100);
        this.pressureChart = this.getTemperaturesChart('Pressure', 'pressureCanvas', currentMeasureInfo.dates,
            pressureMax, pressureMin, pressureAvg);
    }

    private createHumidityChart(currentMeasureInfo) {
        const humidityMax: Array<number> = currentMeasureInfo.humidityStatistics
            .map((humidityStatistics) => Math.round(humidityStatistics.max * 100) / 100);
        const humidityMin: Array<number> = currentMeasureInfo.humidityStatistics
            .map((humidityStatistics) => Math.round(humidityStatistics.min * 100) / 100);
        const humidityAvg: Array<number> = currentMeasureInfo.humidityStatistics
            .map((humidityStatistics) => Math.round(humidityStatistics.avg * 100) / 100);
        this.humidityChart = this.getTemperaturesChart('Humidity', 'humidityCanvas', currentMeasureInfo.dates,
            humidityMax, humidityMin, humidityAvg);
    }

    private getTemperaturesChart(title: string, canvas: string,
                                 weatherDays: Array<string>,
                                 maxValues: Array<number>,
                                 meanValues: Array<number>,
                                 minValues: Array<number>) {
        return new Chart(canvas, {
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
                title: {
                    display: true,
                    text: title
                },
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
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            },
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
