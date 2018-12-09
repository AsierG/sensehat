package com.asierg.sensehat.domain;

import com.asierg.sensehat.domain.converters.LocalDateTimeAttributeConverter;
import com.asierg.sensehat.utils.DateUtils;
import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(indexes = { @Index(name = "IDX_DATE", columnList = "date") })
public class Measure {

  @Id
  @SequenceGenerator(name = "measureSeqGenerator", sequenceName = "id_measure_seq")
  @GeneratedValue(generator = "measureSeqGenerator")
  @Column(name = "id_countries", nullable = false)
  private Long id;

  @Column(nullable = false)
  private Double temperature;

  private Double temperatureFromHumidity;

  private Double temperatureFromCpu;

  private Double temperatureFromPressure;

  @Column(nullable = false)
  private Double pressure;

  @Column(nullable = false)
  private Double humidity;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
  @Convert(converter = LocalDateTimeAttributeConverter.class)
  @Column(nullable = false)
  private LocalDateTime date;

  @Column(nullable = false)
  private Integer yearMonthDay;

  @PrePersist
  public void prePersistSetYearMonthDayFromDate() {
    setYearMonthDay(DateUtils.localDateTimeToYearMonthDayIntegerFormatDate(getDate()));
  }
}
