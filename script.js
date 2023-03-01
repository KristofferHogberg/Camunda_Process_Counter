function submitForm() {
    const processInstanceId = document.getElementById("processInstanceId").value;
    const apiUrl = `https://84f8-83-233-216-66.eu.ngrok.io/_count`;

    function requestBody(id) {
        console.log(id);
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
        const body = requestBody(processInstanceId);
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
