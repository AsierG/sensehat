package com.asierg.sensehat.services.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Statistics {

  private double max;
  private double min;
  private double avg;
}
