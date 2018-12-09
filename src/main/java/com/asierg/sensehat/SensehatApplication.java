package com.asierg.sensehat;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.EnvironmentSensorAdapter;
import com.asierg.sensehat.services.MeasureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.time.Month;

@SpringBootApplication
public class SensehatApplication {

  public static void main(String[] args) {
    SpringApplication.run(SensehatApplication.class, args);
  }

  private EnvironmentSensorAdapter environmentSensorAdapter;

  @Autowired
  public SensehatApplication(EnvironmentSensorAdapter environmentSensorAdapter) {
    this.environmentSensorAdapter = environmentSensorAdapter;
  }

  @Bean
  @Profile("default")
  CommandLineRunner runner(MeasureService measureService) {
    return args -> {
      LocalDateTime startDateTime = LocalDateTime.of(2018, Month.DECEMBER, 1, 0, 0);
      LocalDateTime endDateTime = LocalDateTime.of(2018, Month.DECEMBER, 31, 23, 0);
      while (startDateTime.isBefore(endDateTime)) {
        startDateTime = startDateTime.plusMinutes(15);
        Measure measure = environmentSensorAdapter.getMeasure();
        measure.setDate(startDateTime);
        measureService.saveMeasure(measure);
      }
    };
  }
}
