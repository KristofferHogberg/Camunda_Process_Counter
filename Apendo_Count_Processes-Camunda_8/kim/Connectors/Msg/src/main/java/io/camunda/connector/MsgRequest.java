package io.camunda.connector;

import io.camunda.connector.api.annotation.Secret;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import java.util.Objects;

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
}
