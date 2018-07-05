import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Measure} from "../measure.model";
import * as moment from 'moment';
import {Chart} from 'chart.js';

@Component({
    selector: 'app-measure-graphics',
    templateUrl: './measure-graphics.component.html'
})
export class MeasureGraphicsComponent implements OnInit, OnChanges {

    @Input() measures: Measure[];

    @ViewChild('canvas') canvas: ElementRef;

    chart = [];

    public lineChartData: Array<any> = [
        [65, 59, 80, 81, 56, 55, 40]
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType: string = 'line';

    public dates: Array<any> = [];
    public temperatures: Array<Number> = [];

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    constructor() {
    }

    ngOnInit(): void {
        // this.loadChart();
    }

    ngOnChanges(changes: SimpleChanges) {

        const currentMeasures = <Measure[]> changes.measures.currentValue;
        if (currentMeasures.length > 0) {
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, "DD-MM-YYYY HH:mm:ss"));
            this.temperatures = currentMeasures
                .map((measure) => measure.temperature);
            this.loadChart();
        }

    }

    loadChart() {
        let options = {
            type: 'line',
            data: {
                labels: this.dates,
                datasets: [
                    {
                        label: 'Temperature',
                        data: this.temperatures,
                        borderColor: "#c45850",
                        fill: true
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel.toFixed(2);
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        position: 'bottom',
                        time: {
                            unit: 'hour',
                            unitStepSize: 5,
                            round: 'minute',
                            tooltipFormat: "DD MMM YYYY, HH:mm:ss",
                            displayFormats: {
                                hour: 'D MMM, HH'
                            }
                        }

                    }],
                    yAxes: [{
                        ticks: {
                            reverse: false
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Temperature Measures'
                }
            }
        };

        this.chart = new Chart('canvas', options);
        // this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), options);
    }


}
