
const formatPayload = (processes, beforeDateMillis, afterDateMillis) => {
  const processesString = processes.length === 0 ? 'HP_.*' : processes.join('|');
  return JSON.stringify({
    "query": {
      "bool": {
        "must": [
          {
            "regexp": {
              "value.bpmnProcessId": processesString
            }
          },
          {
            "wildcard": {
              "_index": "zeebe-*"
            }
          },
          {
            "match": {
              "value.bpmnElementType": "END_EVENT"
            }
          },
          {
            "match": {
              "intent": "ELEMENT_COMPLETED"
            }
          },
          {
            "range": {
              "timestamp": {
                "lte": afterDateMillis,
                "gte": beforeDateMillis
              }
            }
          }
        ]
      }
    }
  });
}
