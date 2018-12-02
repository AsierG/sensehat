export class Measure {

    public id: number;
    public temperature: number;
    public temperatureFromHumidity: number;
    public temperatureFromCpu: number;
    public temperatureFromPressure: number;
    public pressure: number;
    public humidity: number;
    public date: string;

    constructor(id: number, temperature: number, temperatureFromHumidity:
                    number, temperatureFromCpu: number, number, temperatureFromPressure: number,
                pressure: number, humidity: number, date: string) {
        this.id = id;
        this.temperature = temperature;
        this.temperatureFromHumidity = temperatureFromHumidity;
        this.temperatureFromCpu = temperatureFromCpu;
        this.temperatureFromPressure = temperatureFromPressure;
        this.pressure = pressure;
        this.humidity = humidity;
        this.date = date;
    }

}
