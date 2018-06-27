import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Measure} from "../measure.model";
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

    public dates: Array<String> = [];
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
        // console.log(changes);
        const currentMeasures = <Measure[]> changes.measures.currentValue;
        this.dates = this.measures.map((measure) => measure.date);
        this.temperatures = this.measures.map((measure) => measure.temperature);
        console.log('dates ' + this.dates + ' fin');
        console.log('temperatures ' + this.temperatures + ' fin');
        // console.log('currentMeasures ' + currentMeasures);
        this.loadChart();
    }


    ngAfterViewInit() {
        // this.loadChart();
    }


    loadChart() {
        let options = {
            type: 'line',
            data: {
                // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
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
