package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.dto.MeasureDTO;

import java.time.LocalDateTime;

public interface MeasureService {

  Iterable<Measure> getAllMeasures();

  Measure saveMeasure(Measure measure);

  Measure findById(Long id);

  Measure updateMeasure(MeasureDTO measureDTO);

  Iterable<Measure> getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to);
}
