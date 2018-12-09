package com.asierg.sensehat.services.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MeasuresInfo {

  @Builder.Default private List<Measure> measures = new ArrayList<>();
  private List<String> dates;
  private List<Statistics> temperatureStatistics;
  private List<Statistics> pressureStatistics;
  private List<Statistics> humidityStatistics;
}
