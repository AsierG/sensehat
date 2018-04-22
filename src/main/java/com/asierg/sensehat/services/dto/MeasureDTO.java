package com.asierg.sensehat.services.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeasureDTO {

    private Long id;
    private Double temperature;
//    private Double temperatureFromHumidity;
//    private Double temperatureFromCpu;
//    private Double temperatureFromPressure;
    private Double pressure;
    private Double humidity;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
//    private Date date;

}
