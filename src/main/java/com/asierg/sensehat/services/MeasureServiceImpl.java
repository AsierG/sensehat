package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.repositories.MeasureRepository;
import com.asierg.sensehat.services.dto.MeasureDTO;
import com.asierg.sensehat.services.dto.MeasuresInfoDTO;
import com.asierg.sensehat.services.dto.StatisticsDTO;
import com.asierg.sensehat.utils.FunctionUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

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

  //    @Scheduled(initialDelay = 1000, fixedRate = 10000)
  public void scheduledTask() {
    Measure measure = environmentSensorAdapter.getMeasure();
    Measure savedMeasure = measureRepository.save(measure);
    log.info("saved measure {}", savedMeasure);
  }

  public List<Measure> getAllMeasures() {
    return measureRepository.findAllByOrderByDateAsc();
  }

  @Override
  public List<Measure> getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to) {
    List<Measure> measureList = measureRepository.getAllByDateIsBetweenOrderByDateAsc(from, to);
    MeasuresInfoDTO measuresInfoDTO = getMeasuresInfoFromMeasures(measureList);
    return measureList;
  }

  private MeasuresInfoDTO getMeasuresInfoFromMeasures(List<Measure> measureList) {
    List<MeasureDTO> measureDTOList = objectMapperService.mapAll(measureList, MeasureDTO.class);
    MeasuresInfoDTO measuresInfoDTO =
        MeasuresInfoDTO.builder().measureDTOList(measureDTOList).build();
    Map<Integer, List<Measure>> dateMeasureMap =
        measureList.stream().collect(FunctionUtils.sortedGroupingBy(Measure::getYearMonthDay));
    List<StatisticsDTO> temperatureStatistics = new ArrayList<>();
    List<StatisticsDTO> humidityStatistics = new ArrayList<>();
    List<StatisticsDTO> pressureStatistics = new ArrayList<>();
    List<String> dates = new ArrayList<>();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    dateMeasureMap.forEach(
        (date, measures) -> {
          dates.add(measures.get(0).getDate().format(formatter));
          temperatureStatistics.add(getStatisticDTOBuild(getTemperatureStatistics(measures)));
          humidityStatistics.add(getStatisticDTOBuild(getHumidityStatistics(measures)));
          pressureStatistics.add(getStatisticDTOBuild(getPressureStatistics(measures)));
        });
    measuresInfoDTO.setDates(dates);
    measuresInfoDTO.setTemperatureStatistics(temperatureStatistics);
    measuresInfoDTO.setHumidityStatistics(humidityStatistics);
    measuresInfoDTO.setPressureStatistics(pressureStatistics);
    return measuresInfoDTO;
  }

  private StatisticsDTO getStatisticDTOBuild(DoubleSummaryStatistics summaryStatistics) {
    return StatisticsDTO.builder()
        .max(summaryStatistics.getMax())
        .min(summaryStatistics.getMin())
        .avg(summaryStatistics.getAverage())
        .build();
  }

  private DoubleSummaryStatistics getTemperatureStatistics(List<Measure> measures) {
    return measures
        .stream()
        .map(Measure::getTemperature)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
  }

  private DoubleSummaryStatistics getHumidityStatistics(List<Measure> measures) {
    return measures
        .stream()
        .map(Measure::getHumidity)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
  }

  private DoubleSummaryStatistics getPressureStatistics(List<Measure> measures) {
    return measures
        .stream()
        .map(Measure::getPressure)
        .collect(Collectors.toList())
        .stream()
        .collect(
            DoubleSummaryStatistics::new,
            DoubleSummaryStatistics::accept,
            DoubleSummaryStatistics::combine);
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
