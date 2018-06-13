import {Component, Input} from '@angular/core';
import {Measure} from "../measure.model";
import {WeatherService} from "./weather.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-measure-graphics',
  templateUrl: './measure-graphics.component.html'
})
export class MeasureGraphicsComponent {

    @Input() measures: Measure[] = [];

    chart = [];

    constructor(private _weather: WeatherService) {}


    ngOnInit() {
        this._weather.dailyForecast()
            .subscribe(res => {

                let temp_max = res['list'].map(res => res.main.temp_max);
                let temp_min = res['list'].map(res => res.main.temp_min);
                let alldates = res['list'].map(res => res.dt);

                let weatherDates = [];
                alldates.forEach((res) => {
                    let jsdate = new Date(res * 1000);
                    weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
                });

                this.chart = new Chart('canvas', {
                    type: 'line',
                    data: {
                        labels: weatherDates,
                        datasets: [
                            {
                                data: temp_max,
                                borderColor: '#3cba9f',
                                fill: false
                            },
                            {
                                data: temp_min,
                                borderColor: '#ffcc00',
                                fill: false
                            },
                        ]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                display: true
                            }],
                            yAxes: [{
                                display: true
                            }]
                        }
                    }
                })

            })
    }



    // // lineChart
    // public lineChartData:Array<any> = [
    //     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    //     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //     {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    // ];
    // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // public lineChartOptions:any = {
    //     responsive: true
    // };
    // public lineChartColors:Array<any> = [
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     },
    //     { // dark grey
    //         backgroundColor: 'rgba(77,83,96,0.2)',
    //         borderColor: 'rgba(77,83,96,1)',
    //         pointBackgroundColor: 'rgba(77,83,96,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(77,83,96,1)'
    //     },
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     }
    // ];
    // public lineChartLegend:boolean = true;
    // public lineChartType:string = 'line';
    //
    // public randomize():void {
    //     let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }
    //
    // // events
    // public chartClicked(e:any):void {
    //     console.log(e);
    // }
    //
    // public chartHovered(e:any):void {
    //     console.log(e);
    // }

}
