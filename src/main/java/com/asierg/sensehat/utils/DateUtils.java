package com.asierg.sensehat.utils;

import java.time.LocalDateTime;

public class DateUtils {

  public static Integer localDateTimeToYearMonthDayIntegerFormatDate(
      LocalDateTime localDateTime) {
    Integer value = null;
    if (localDateTime != null) {
      StringBuilder stringBuilder = new StringBuilder();
      stringBuilder
          .append(localDateTime.getYear())
          .append(getStringFormattedValueFromInteger(localDateTime.getMonthValue()))
          .append(getStringFormattedValueFromInteger(localDateTime.getDayOfMonth()));
      value = Integer.valueOf(stringBuilder.toString());
    }
    return value;
  }

  private static String getStringFormattedValueFromInteger(Integer value) {
    return value >= 10 ? value.toString() : "0" + value;
  }
}
