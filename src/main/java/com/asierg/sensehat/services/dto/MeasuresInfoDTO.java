package com.asierg.sensehat.services.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MeasuresInfoDTO {

  private List<MeasureDTO> measureDTOList = new ArrayList<>();
  private List<String> dates;
  private List<StatisticsDTO> temperatureStatistics;
  private List<StatisticsDTO> pressureStatistics;
  private List<StatisticsDTO> humidityStatistics;
}
