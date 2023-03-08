function submitForm() {
    const processInstanceId = document.getElementById("processInstanceId").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;

    const startTimestamp = new Date(startDate + " " + startTime).toISOString();
    const endTimestamp = new Date(endDate + " " + endTime).toISOString();

    const apiUrl = `https://5961-193-14-79-226.eu.ngrok.io/_count`;

    function requestBody(id, start, end) {
        console.log(id, start, end);
        let payload = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "regexp": {
                                "bpmnProcessId": id
                            }
                        },
                        {
                            "wildcard": {
                                "_index": "operate-list-view-8.1.0_"
                            }
                        },
                        {
                            "range": {
                                "startDate": {
                                    "gte": startTimestamp,
                                    "lte": endTimestamp,
                                    "format": "date_time || date"
                                }
                            }
                        }
                    ]
                }
            }
        };
        return JSON.stringify(payload);
    }

    const processInstanceIds = processInstanceId.split(",");
    let countTotalData = 0;

    console.log(processInstanceIds)
    document.getElementById("result").innerHTML = "";
    const requests = processInstanceIds.map((processInstanceId) => {
        const url = apiUrl;
        const body = requestBody(processInstanceId, startTimestamp, endTimestamp);
        console.log("body " + body);
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }).then(response => response.json()).then(data => {
            countTotalData += data.count
            console.log(data)
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML +=processInstanceId +" : "+ JSON.stringify(data.count, null, 2) + "<br>";
        }).catch(error => console.error(error));
    });
    Promise.all(requests).then(() => {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML +="Total: "+ JSON.stringify(countTotalData, null, 2) + "<br>";
    }).catch(error => console.error(error));
}
