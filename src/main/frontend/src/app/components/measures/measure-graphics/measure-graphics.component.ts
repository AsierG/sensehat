import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Measure} from "../measure.model";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-measure-graphics',
  templateUrl: './measure-graphics.component.html'
})
export class MeasureGraphicsComponent implements OnInit{

    @Input() measures: Measure[] = [];

    @ViewChild('canvas') canvas: ElementRef;

    chart = [];

    constructor() {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        let options = {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 1
                    },
                    {
                        label: '# of Points',
                        data: [7, 11, 5, 8, 3, 7],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            reverse: false
                        }
                    }]
                }
            }
        };

        this.chart = new Chart('canvas', options);
        // this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), options);
    }




}
