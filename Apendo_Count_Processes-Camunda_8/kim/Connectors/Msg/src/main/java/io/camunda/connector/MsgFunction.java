package io.camunda.connector;

import io.camunda.connector.api.annotation.OutboundConnector;
import io.camunda.connector.api.outbound.OutboundConnectorContext;
import io.camunda.connector.api.outbound.OutboundConnectorFunction;
import io.camunda.zeebe.client.ZeebeClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@OutboundConnector(
    name = "Msg",
    inputVariables = {"time", "food", "drink", "correlationKey", "message"},
    type = "io.camunda:msg:1")
public class MsgFunction implements OutboundConnectorFunction {

  private static final Logger LOGGER = LoggerFactory.getLogger(MsgFunction.class);

  @Override
  public Object execute(OutboundConnectorContext context) throws Exception {
    var connectorRequest = context.getVariablesAsType(MsgRequest.class);
    LOGGER.info("Executing my connector with request {}", connectorRequest);

//    context.validate(connectorRequest);
    context.replaceSecrets(connectorRequest);

    return executeConnector(connectorRequest);
  }

  private MsgResult executeConnector(final MsgRequest connectorRequest) {
    // TODO: implement connector logic
    LOGGER.info("Executing my connector with request {}", connectorRequest);
    var time = connectorRequest.getTime();
    var food = connectorRequest.getFood();
    var drink = connectorRequest.getDrink();
    var correlationKey = connectorRequest.getCorrelationKey();
    var messageName = connectorRequest.getMessage();

    ZeebeClient client = ZeebeClient.newClientBuilder().gatewayAddress("localhost:26500").usePlaintext().build();

    final var processInstanceEvent =
            client.newPublishMessageCommand()
                    .messageName(messageName)
                    .correlationKey(correlationKey)
                    .variables(Map.of(
                            "time", time,
                            "food", food,
                            "drink", drink))
                    .send()
                    .join();

    client.close();

    var result = new MsgResult();
    result.setMessage("Message started: " + processInstanceEvent.getMessageKey());
    return result;
  }
}
