package com.asierg.sensehat.services;

import com.asierg.sensehat.repositories.MeasureRepository;
import com.asierg.sensehat.services.dto.Measure;
import com.asierg.sensehat.services.dto.MeasuresInfo;
import com.asierg.sensehat.services.dto.Statistics;
import com.asierg.sensehat.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MeasureServiceImpl implements MeasureService {

  private EnvironmentSensorAdapter environmentSensorAdapter;
  private MeasureRepository measureRepository;
  private ObjectMapperService objectMapperService;

  public MeasureServiceImpl(
      EnvironmentSensorAdapter environmentSensorAdapter,
      MeasureRepository measureRepository,
      ObjectMapperService objectMapperService) {
    this.environmentSensorAdapter = environmentSensorAdapter;
    this.measureRepository = measureRepository;
    this.objectMapperService = objectMapperService;
  }

  @Scheduled(cron = "0 */15 * ? * *")
  public void scheduledTask() {
    com.asierg.sensehat.domain.Measure savedMeasure =
        measureRepository.save(environmentSensorAdapter.getMeasure());
    log.info("saved measure {}", savedMeasure);
  }

  @Override
  public MeasuresInfo getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to) {
    List<com.asierg.sensehat.domain.Measure> measureList =
        measureRepository.getAllByDateIsBetweenOrderByDateAsc(from, to);
    return getMeasuresInfoFromMeasures(measureList);
  }

  private MeasuresInfo getMeasuresInfoFromMeasures(
      List<com.asierg.sensehat.domain.Measure> measureList) {
    List<Measure> measureDTOList = objectMapperService.mapAll(measureList, Measure.class);
    MeasuresInfo measuresInfo = MeasuresInfo.builder().measures(measureDTOList).build();
    Map<Integer, List<com.asierg.sensehat.domain.Measure>> dateMeasureMap =
        measureList
            .stream()
            .collect(
                FunctionUtils.sortedGroupingBy(
                    com.asierg.sensehat.domain.Measure::getYearMonthDay));
    List<Statistics> temperatureStatistics = new ArrayList<>();
    List<Statistics> humidityStatistics = new ArrayList<>();
    List<Statistics> pressureStatistics = new ArrayList<>();
    List<String> dates = new ArrayList<>();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    dateMeasureMap.forEach(
        (date, measures) -> {
          dates.add(measures.get(0).getDate().format(formatter));
          temperatureStatistics.add(getStatisticDTOBuild(getTemperatureStatistics(measures)));
          humidityStatistics.add(getStatisticDTOBuild(getHumidityStatistics(measures)));
          pressureStatistics.add(getStatisticDTOBuild(getPressureStatistics(measures)));
        });
    measuresInfo.setDates(dates);
    measuresInfo.setTemperatureStatistics(temperatureStatistics);
    measuresInfo.setHumidityStatistics(humidityStatistics);
    measuresInfo.setPressureStatistics(pressureStatistics);
    return measuresInfo;
  }

  private Statistics getStatisticDTOBuild(DoubleSummaryStatistics summaryStatistics) {
    return Statistics.builder()
        .max(summaryStatistics.getMax())
        .min(summaryStatistics.getMin())
        .avg(summaryStatistics.getAverage())
        .build();
  }

  private DoubleSummaryStatistics getTemperatureStatistics(
      List<com.asierg.sensehat.domain.Measure> measures) {
    return measures
        .stream()
        .map(com.asierg.sensehat.domain.Measure::getTemperature)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
  }

  private DoubleSummaryStatistics getHumidityStatistics(
      List<com.asierg.sensehat.domain.Measure> measures) {
    return measures
        .stream()
        .map(com.asierg.sensehat.domain.Measure::getHumidity)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
  }

  private DoubleSummaryStatistics getPressureStatistics(
      List<com.asierg.sensehat.domain.Measure> measures) {
    return measures
        .stream()
        .map(com.asierg.sensehat.domain.Measure::getPressure)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
  }

  @Override
  public com.asierg.sensehat.domain.Measure saveMeasure(
      com.asierg.sensehat.domain.Measure measure) {
    return measureRepository.save(measure);
  }

  @Override
  public Measure findById(Long id) {
    return objectMapperService.map(measureRepository.findOne(id), Measure.class);
  }

  @Override
  public Measure updateMeasure(Measure measureDTO) {
    com.asierg.sensehat.domain.Measure measure = measureRepository.findOne(measureDTO.getId());
    measure.setPressure(measureDTO.getPressure());
    measure.setHumidity(measureDTO.getHumidity());
    measure.setTemperature(measureDTO.getTemperature());
    return objectMapperService.map(measureRepository.save(measure), Measure.class);
  }
}
