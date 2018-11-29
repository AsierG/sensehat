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

import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;
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
        final LocalDate[] startLocalDate = {LocalDate.of(2018, 8, 25)};
        return args -> {
            IntStream.rangeClosed(1, 100)
                    .forEach(
                            i -> {
                                Measure measure = environmentSensorAdapter.getMeasure();
                                startLocalDate[0] = startLocalDate[0].plusDays(1);
                                int minHour = 0;
                                int maxHour = 23;
                                int randomHour = ThreadLocalRandom.current().nextInt(minHour, maxHour);
                                int min = 0;
                                int max = 59;
                                int randomMinute = ThreadLocalRandom.current().nextInt(min, max);
                                int randomSecond = ThreadLocalRandom.current().nextInt(min, max);
                                measure.setDate(startLocalDate[0].atTime(randomHour, randomMinute, randomSecond));
                                measureService.saveMeasure(measure);
                            });
        };
    }
}
