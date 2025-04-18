package ru.kaidan.backend.utils.exceptions;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ErrorResponse {
  private String code;
  private String message;
  private String path;
  private Map<String, String> details;
}
