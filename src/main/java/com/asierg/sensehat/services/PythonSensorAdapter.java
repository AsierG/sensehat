package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import lombok.extern.slf4j.Slf4j;
import okio.Okio;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
@Profile("prod")
public class PythonSensorAdapter implements EnvironmentSensorAdapter {

  @Override
  public double getPressure() {
    String rawPressure = callSenseHatGetter("get_pressure");
    return Double.parseDouble(rawPressure);
  }

  @Override
  public double getTemperatureFromPressure() {
    String rawTemp = callSenseHatGetter("get_temperature_from_pressure");
    return Double.parseDouble(rawTemp);
  }

  @Override
  public double getHumidity() {
    Double humidity = Double.parseDouble(callSenseHatGetter("get_humidity"));
    log.info("HUMIDITY == {}", humidity);
    return Double.parseDouble(callSenseHatGetter("get_humidity"));
  }

  @Override
  public double getTemperatureFromHumidity() {
    return Double.parseDouble(callSenseHatGetter("get_temperature_from_humidity"));
  }

  @Override
  public double getTemperatureFromCpu() {
    return 0;
  }

  private String callSenseHatGetter(String getterName) {
    return execPythonCode(String.format("print sense.%s()", getterName));
  }

  @Override
  public Measure getMeasure() {
    return null;
  }

  private String execPythonCode(String line) {

    String code = "from sense_hat import SenseHat\n" + "sense = SenseHat()\n" + "\n" + line;
    try {
      Process process = Runtime.getRuntime().exec(new String[] {"python", "-c", code});
      int exitCode = process.waitFor();
      if (exitCode == 0) {
        return Okio.buffer(Okio.source(process.getInputStream())).readUtf8();
      } else {
        log.error("Python exited with code {}", exitCode);
        String error = Okio.buffer(Okio.source(process.getErrorStream())).readUtf8();
        log.error(error);
        throw new RuntimeException(error);
      }
    } catch (IOException | InterruptedException e) {
      throw new RuntimeException(e);
    }
  }
}
