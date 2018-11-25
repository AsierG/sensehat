import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Measure} from '../measure.model';
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

    ngOnChanges(changes: SimpleChanges): void {

        const currentMeasures = <Measure[]> changes.measures.currentValue;

        let prueba: any[] = [];

        if (currentMeasures.length > 0) {
            console.log('currentMeasures ' + currentMeasures.length );
            this.dates = currentMeasures
                .map((measure) => moment(measure.date, 'DD-MM-YYYY HH:mm:ss')
                    .toDate());
            this.temperatures = currentMeasures
                .map((measure) => measure.temperature);
        }

        console.log('PRUEBA ' + prueba);

    }


}
