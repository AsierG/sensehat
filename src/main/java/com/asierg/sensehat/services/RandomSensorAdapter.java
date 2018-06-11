package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
  public double getTemperatureFromCpu() {
    return 21d + random.nextGaussian();
  }

  @Override
  public Measure getMeasure() {
    double humidity = getHumidity();
    double pressure = getPressure();
    double temperatureFromHumidity = getTemperatureFromHumidity();
    double temperatureFromPressure = getTemperatureFromPressure();
    double temperatureFromCpu = getTemperatureFromCpu();
    double tempTemperature = (temperatureFromHumidity + temperatureFromPressure) / 2;
    double temperature = temperatureFromCpu - ((temperatureFromCpu - tempTemperature) / 1.5);
    return Measure.builder()
        .temperatureFromHumidity(temperatureFromHumidity)
        .temperatureFromPressure(temperatureFromPressure)
        .temperatureFromCpu(temperatureFromCpu)
        .temperature(temperature)
        .pressure(pressure)
        .humidity(humidity)
        .date(LocalDateTime.now())
        .build();
  }
}
