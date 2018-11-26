import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Measure} from '../measure.model';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
    selector: 'app-measure-graphics',
    templateUrl: './measure-graphics.component.html',
    styleUrls: ['./measure-graphics.component.css']
})
export class MeasureGraphicsComponent implements OnChanges {

    @Input() measures: Measure[];

    public dates: Array<any> = [];
    public temperatures: Array<Number> = [];

    chart = [];


    // lineChart
    public lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public randomize(): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {
                data: new Array(this.lineChartData[i].data.length),
                label: this.lineChartData[i].label
            };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


    ngOnChanges(changes: SimpleChanges): void {

        const currentMeasures = <Measure[]> changes.measures.currentValue;

        let prueba: any[] = [];
        const weahterDays = [];

        if (currentMeasures.length > 0) {
            console.log('currentMeasures ' + currentMeasures.length);
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, 'DD-MM-YYYY HH:mm:ss')
                    .toDate());
            this.temperatures = currentMeasures
                .map((measure) => measure.temperature);
            this.dates.forEach(date => {
               // let jsDate = new Date(result * 1000);
                let options = {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                };
                weahterDays.push(date.toLocaleTimeString('es', options));
            });


            this.chart = new Chart("canvas", {
                type: "bar",
                data: {
                    labels: weahterDays,
                    datasets: [
                        {
                            label: "Maxima",
                            data: this.temperatures,
                            backgroundColor: [
                                "red",
                                "red",
                                "red",
                                "red",
                                "red",
                                "red",
                                "red"
                            ],
                            fill: false
                        },
                        {
                            label: "Minima",
                            data: this.temperatures,
                            backgroundColor: [
                                "#00ffff",
                                "#00ffff",
                                "#00ffff",
                                "#00ffff",
                                "#00ffff",
                                "#00ffff",
                                "#00ffff"
                            ],
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        dispaly: false
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
