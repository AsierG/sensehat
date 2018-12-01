package com.asierg.sensehat.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ObjectMapperService {

  private ModelMapper modelMapper;

  public ObjectMapperService(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public <D, T> D map(final T entity, Class<D> outClass) {
    return modelMapper.map(entity, outClass);
  }

  public <D, T> List<D> mapAll(final Collection<T> entityList, Class<D> outCLass) {
    return entityList.stream().map(entity -> map(entity, outCLass)).collect(Collectors.toList());
  }

  public <S, D> D map(final S source, D destination) {
    modelMapper.map(source, destination);
    return destination;
  }
}
