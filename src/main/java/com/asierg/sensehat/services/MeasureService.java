package com.asierg.sensehat.services;

import com.asierg.sensehat.domain.Measure;

public interface MeasureService {

    Iterable<Measure> getAllMeasures();

    Measure saveMeasure(Measure measure);

}
