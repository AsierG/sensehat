package com.asierg.sensehat.controller;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.EnvironmentSensorAdapter;
import com.asierg.sensehat.services.MeasureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sensehat")
public class MeasureController {

  private EnvironmentSensorAdapter environmentSensorAdapter;
  private MeasureService measureService;

  @Autowired
  public MeasureController(
          EnvironmentSensorAdapter environmentSensorAdapter, MeasureService measureService) {
    this.environmentSensorAdapter = environmentSensorAdapter;
    this.measureService = measureService;
  }

  @GetMapping({"/measure"})
  public Measure measures() {
    Measure measure = environmentSensorAdapter.getMeasure();
    return measure;
  }

  @GetMapping({"", "/"})
  public Iterable<Measure> listMeasures() {
    return this.measureService.getAllMeasures();
  }

}
