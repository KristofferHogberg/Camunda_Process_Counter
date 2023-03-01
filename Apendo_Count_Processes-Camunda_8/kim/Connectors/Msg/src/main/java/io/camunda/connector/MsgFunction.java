package io.camunda.connector;

import io.camunda.connector.api.annotation.OutboundConnector;
import io.camunda.connector.api.error.ConnectorException;
import io.camunda.connector.api.outbound.OutboundConnectorContext;
import io.camunda.connector.api.outbound.OutboundConnectorFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@OutboundConnector(
    name = "Msg",
    inputVariables = {"time", "food", "drink", "correlationKey"},
    type = "io.camunda:template:1")
public class MsgFunction implements OutboundConnectorFunction {

  private static final Logger LOGGER = LoggerFactory.getLogger(MsgFunction.class);

  @Override
  public Object execute(OutboundConnectorContext context) throws Exception {
    var connectorRequest = context.getVariablesAsType(MsgRequest.class);

    context.validate(connectorRequest);
    context.replaceSecrets(connectorRequest);

    return executeConnector(connectorRequest);
  }

  private MyConnectorResult executeConnector(final MsgRequest connectorRequest) {
    // TODO: implement connector logic
    LOGGER.info("Executing my connector with request {}", connectorRequest);
    String message = connectorRequest.getMessage();
    if (message != null && message.toLowerCase().startsWith("fail")) {
      throw new ConnectorException("FAIL", "My property started with 'fail', was: " + message);
    }
    var result = new MyConnectorResult();
    result.setMyProperty("Message received: " + message);
    return result;
  }
}
