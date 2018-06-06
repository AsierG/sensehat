package com.asierg.sensehat.repositories;

import com.asierg.sensehat.domain.Measure;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MeasureRepository extends CrudRepository<Measure, Long> {

  List<Measure> getAllByDateIsBetweenOrderByDateAsc(LocalDateTime from, LocalDateTime to);

  List<Measure> findAllByOrderByDateAsc();
}
