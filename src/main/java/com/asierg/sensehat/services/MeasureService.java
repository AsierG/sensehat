package com.asierg.sensehat.services;

import com.asierg.sensehat.services.dto.Measure;
import com.asierg.sensehat.services.dto.MeasuresInfo;

import java.time.LocalDateTime;

public interface MeasureService {

  com.asierg.sensehat.domain.Measure saveMeasure(com.asierg.sensehat.domain.Measure measure);

  Measure findById(long id);

  Measure updateMeasure(long id, Measure measure);

  MeasuresInfo getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to);
}
