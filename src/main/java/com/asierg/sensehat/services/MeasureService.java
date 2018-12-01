package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.dto.MeasureDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface MeasureService {

  List<Measure> getAllMeasures();

  Measure saveMeasure(Measure measure);

  Measure findById(Long id);

  Measure updateMeasure(MeasureDTO measureDTO);

  List<Measure> getMeasuresBetweenDates(LocalDateTime from, LocalDateTime to);
}
