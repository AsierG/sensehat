package com.asierg.sensehat.services;

import com.asierg.sensehat.services.dto.Measure;
import com.asierg.sensehat.services.dto.MeasuresInfo;

import java.time.LocalDateTime;
import java.util.List;

public interface MeasureService {

  List<com.asierg.sensehat.domain.Measure> getAllMeasures();

  com.asierg.sensehat.domain.Measure saveMeasure(com.asierg.sensehat.domain.Measure measure);

  com.asierg.sensehat.domain.Measure findById(Long id);

  com.asierg.sensehat.domain.Measure updateMeasure(Measure measure);

//  List<Measure> getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to);

  MeasuresInfo getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to);
}
