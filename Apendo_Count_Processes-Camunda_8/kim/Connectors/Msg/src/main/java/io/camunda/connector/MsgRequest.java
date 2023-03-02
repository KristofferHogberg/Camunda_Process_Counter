package io.camunda.connector;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class MsgRequest {

  @NotEmpty
  private String drink;
  @NotEmpty
  private String time;
  @NotEmpty
  private String food;
  @NotEmpty
  private String correlationKey;
  @NotEmpty
  private String message;
}
