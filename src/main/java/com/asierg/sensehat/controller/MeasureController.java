package com.asierg.sensehat.controller;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.EnvironmentSensorAdapter;
import com.asierg.sensehat.services.MeasureService;
import com.asierg.sensehat.services.dto.MeasureDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

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
  public Measure measure() {
    return environmentSensorAdapter.getMeasure();
  }

  @GetMapping(path = {"/measure/{id}"})
  public Measure findOne(@PathVariable("id") long id) {
    return measureService.findById(id);
  }

  @PutMapping({"/updateMeasure"})
  public ResponseEntity<Measure> updateMeasure(@RequestBody MeasureDTO measureDTO) {
    log.debug("REST request to update Measure a : {}", measureDTO);
    Measure updatedMeasure = measureService.updateMeasure(measureDTO);
    return ResponseEntity.ok().body(updatedMeasure);
  }

  @GetMapping({"", "/"})
  public Iterable<Measure> listMeasures() {
    return this.measureService.getAllMeasures();
  }

  @GetMapping({"/measures/{from}/{to}"})
  public Iterable<Measure> getMeasuresBetweenDates(
      @PathVariable("from") @DateTimeFormat(pattern = "dd-MM-yyyy_HH:mm:ss") LocalDateTime from,
      @PathVariable("to") @DateTimeFormat(pattern = "dd-MM-yyyy_HH:mm:ss") LocalDateTime to) {
    return this.measureService.getAllMeasures();
  }
}
