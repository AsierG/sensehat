package com.asierg.sensehat.domain;

import com.asierg.sensehat.domain.converters.LocalDateTimeAttributeConverter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Measure {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private Double temperature;
  private Double temperatureFromHumidity;
  private Double temperatureFromCpu;
  private Double temperatureFromPressure;
  private Double pressure;
  private Double humidity;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  @Convert(converter = LocalDateTimeAttributeConverter.class)
  private LocalDateTime date;
}
