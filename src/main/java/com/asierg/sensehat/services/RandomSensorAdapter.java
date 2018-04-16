package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Service
@Profile("default")
public class RandomSensorAdapter implements EnvironmentSensorAdapter {

    private Random random = new Random();

    @Override
    public double getHumidity() {
        return 50d + (random.nextGaussian() * 10);
    }

    @Override
    public double getTemperatureFromHumidity() {
        return 21d + random.nextGaussian();
    }

    @Override
    public double getPressure() {
        return 1023d + random.nextGaussian() * 20;
    }

    @Override
    public double getTemperatureFromPressure() {
        return 21d + random.nextGaussian();
    }

    @Override
    public Measure getMeasure() {
        double temperatureFromHumidity = getTemperatureFromHumidity();
        double temperatureFromPressure = getTemperatureFromPressure();
        double humidity = getHumidity();
        double pressure = getPressure();
        Date now = new Date();

        Measure measure = Measure.builder()
                .temperatureFromHumidity(temperatureFromHumidity)
                .temperatureFromPressure(temperatureFromPressure)
                .pressure(pressure)
                .humidity(humidity)
                .date(now)
                .build();
        return measure;
    }
}
