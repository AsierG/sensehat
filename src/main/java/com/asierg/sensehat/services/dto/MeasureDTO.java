package com.asierg.sensehat.services.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeasureDTO {

  private long id;
  private double temperature;
  private double pressure;
  private double humidity;
  private LocalDateTime date;
}
