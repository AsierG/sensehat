package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.repositories.MeasureRepository;
import com.asierg.sensehat.services.dto.MeasureDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
    return measureRepository.findAllByOrderByDateAsc();
  }

  @Override
  public Iterable<Measure> getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to) {
    return measureRepository.getAllByDateIsBetweenOrderByDateAsc(from, to);
  }

  @Override
  public Measure saveMeasure(Measure measure) {
    return measureRepository.save(measure);
  }

  @Override
  public Measure findById(Long id) {
    return measureRepository.findOne(id);
  }

  @Override
  public Measure updateMeasure(MeasureDTO measureDTO) {
    Measure measure = measureRepository.findOne(measureDTO.getId());
    measure.setPressure(measureDTO.getPressure());
    measure.setHumidity(measureDTO.getHumidity());
    measure.setTemperature(measureDTO.getTemperature());
    measureRepository.save(measure);
    return measure;
  }
}
