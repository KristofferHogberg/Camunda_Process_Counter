
const formatPayload = (processes, beforeDateMillis, afterDateMillis) => {

  return {
    "query": {
      "bool": {
        "must": [
          {
            "regexp": {
              "value.bpmnProcessId": processes.length === 0 ? 'HP_.*' : processes.join('|')
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
                "lte": beforeDateMillis,
                "gte": afterDateMillis
              }
            }
          }
        ]
      }
    }
  }
}
