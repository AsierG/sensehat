package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;

public interface EnvironmentSensorAdapter {

    double getHumidity();

    double getPressure();

    double getTemperatureFromPressure();

    double getTemperatureFromHumidity();

    Measure getMeasure();

}
