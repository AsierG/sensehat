package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.repositories.MeasureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MeasureServiceImpl implements MeasureService {

    private EnvironmentSensorAdapter environmentSensorAdapter;
    private MeasureRepository measureRepository;

    public MeasureServiceImpl(
            EnvironmentSensorAdapter environmentSensorAdapter, MeasureRepository measureRepository) {
        this.environmentSensorAdapter = environmentSensorAdapter;
        this.measureRepository = measureRepository;
    }

//    @Scheduled(initialDelay = 1000, fixedRate = 10000)
    public void scheduledTask() {
        Measure measure = environmentSensorAdapter.getMeasure();
        Measure savedMeasure = measureRepository.save(measure);
        log.info("saved measure {}", savedMeasure);
    }

    public Iterable<Measure> getAllMeasures() {
        return measureRepository.findAll();
    }

    @Override
    public Measure saveMeasure(Measure measure) {
        return measureRepository.save(measure);
    }
}
