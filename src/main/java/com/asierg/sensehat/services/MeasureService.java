package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.dto.MeasureDTO;

public interface MeasureService {

  Iterable<Measure> getAllMeasures();

  Measure saveMeasure(Measure measure);

  Measure findById(Long id);

  Measure updateMeasure(MeasureDTO measureDTO);
}
