package org.example;

import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.response.DeploymentEvent;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.client.api.worker.JobHandler;
import io.camunda.zeebe.client.api.worker.JobWorker;

import java.time.Duration;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        ZeebeClient client = ZeebeClient.newClientBuilder().gatewayAddress("localhost:26500").usePlaintext().build();

//        final var processInstanceEvent =
//                client.newPublishMessageCommand()
//                        .messageName("FirstMessage")
//                        .correlationKey("12334")
//                        .variables(Map.of("time", "PT5S"))
//                        .send()
//                        .join();
//
//        System.out.println(
//                "Process instance created with key: " + processInstanceEvent.getMessageKey());
//        client.close();

        final String jobType = "msg";


            System.out.println("Opening job worker.");

            try (final JobWorker workerRegistration =
                         client
                                 .newWorker()
                                 .jobType(jobType)
                                 .handler(new ExampleJobHandler())
                                 .timeout(Duration.ofSeconds(10))
                                 .open()) {
                System.out.println("Job worker opened and receiving jobs.");

            }


    }


    private static class ExampleJobHandler implements JobHandler {
        @Override
        public void handle(final JobClient client, final ActivatedJob job) {
            // here: business logic that is executed with every job
            System.out.println(job);
            System.out.println(job.getProcessInstanceKey());
            client.newCompleteCommand(job.getKey()).send().join();s
        }
    }

}