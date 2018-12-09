package com.asierg.sensehat.controller;

import com.asierg.sensehat.services.EnvironmentSensorAdapter;
import com.asierg.sensehat.services.MeasureService;
import com.asierg.sensehat.services.dto.Measure;
import com.asierg.sensehat.services.dto.MeasuresInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sensehat")
@Slf4j
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
  public com.asierg.sensehat.domain.Measure measure() {
    return environmentSensorAdapter.getMeasure();
  }

  @GetMapping(path = {"/measure/{id}"})
  public Measure findOne(@PathVariable("id") long id) {
    return measureService.findById(id);
  }

  @PutMapping({"/updateMeasure"})
  public ResponseEntity<Measure> updateMeasure(@RequestBody Measure measure) {
    log.debug("REST request to update Measure a : {}", measure);
    Measure updatedMeasure = measureService.updateMeasure(measure);
    return ResponseEntity.ok().body(updatedMeasure);
  }

  @GetMapping({"/measures/{from}/{to}"})
  public MeasuresInfo getMeasuresBetweenDates(
          @PathVariable("from") @DateTimeFormat(pattern = "dd-MM-yyyy_HH:mm:ss") LocalDateTime from,
          @PathVariable("to") @DateTimeFormat(pattern = "dd-MM-yyyy_HH:mm:ss") LocalDateTime to) {
    return this.measureService.getMeasuresBetweenDates(from, to);
  }

}
