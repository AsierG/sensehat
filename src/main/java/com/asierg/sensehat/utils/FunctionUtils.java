package com.asierg.sensehat.utils;

import java.util.List;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class FunctionUtils {

  public static <T, K extends Comparable<K>> Collector<T, ?, TreeMap<K, List<T>>> sortedGroupingBy(
      Function<T, K> function) {
    return Collectors.groupingBy(function, TreeMap::new, Collectors.toList());
  }
}
