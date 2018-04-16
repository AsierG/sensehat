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

import java.util.stream.IntStream;

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
            IntStream.rangeClosed(1, 100).forEach(i -> {
                Measure measure = environmentSensorAdapter.getMeasure();
                measureService.saveMeasure(measure);
            });
        };
    }

}
