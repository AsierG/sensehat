package com.asierg.sensehat.controller;

import com.asierg.sensehat.domain.Measure;
import com.asierg.sensehat.services.EnvironmentSensorAdapter;
import com.asierg.sensehat.services.MeasureService;
import com.asierg.sensehat.services.dto.MeasureDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping({"/updateMeasure"})
    public ResponseEntity<MeasureDTO> updateMeasure(@RequestBody MeasureDTO measureDTO) {
        log.debug("REST request to update Measure : {}", measureDTO);
        return ResponseEntity.ok()
                .body(measureDTO);
    }

    @GetMapping({"", "/"})
    public Iterable<Measure> listMeasures() {
        return this.measureService.getAllMeasures();
    }

}
