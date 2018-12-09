package com.asierg.sensehat.services.dto;

import com.asierg.sensehat.domain.converters.LocalDateTimeAttributeConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Measure {

  private long id;
  private double temperature;
  private double temperatureFromHumidity;
  private double temperatureFromCpu;
  private double temperatureFromPressure;
  private double pressure;
  private double humidity;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  @Convert(converter = LocalDateTimeAttributeConverter.class)
  private LocalDateTime date;
}
