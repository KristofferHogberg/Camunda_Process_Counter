const getProcessCount = async (processId) => {

    let endpoint;
    let body = {};

    body = await getDateAndTime();
    body.processDefinitionKey = processId;
    body = JSON.stringify(body);

    endpoint = `http://localhost:8080/engine-rest/history/process-instance/count`;

    const options = {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: body,
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data;

}

const getProcessById = async (processId) => {
    const endpoint = new URL(`http://localhost:8080/engine-rest/history/process-instance?processDefinitionKey=${processId}`);
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);

    return response.json();

}

const getAllProcesses = async () => {

    const endpoint = new URL(`http://localhost:8080/engine-rest/history/process-instance`);
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);
    return await response.json();
}

const countAllProcesses = async () => {
    const endpoint = new URL(`http://localhost:8080/engine-rest/history/process-instance/count`);
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);

    return await response.json();
}

const handleSubmit = async (event) => {
    // await location.reload();
    document.addEventListener('DOMContentLoaded', () => {
    });
    event.preventDefault();

    const processId = document.getElementById('processIdGet').value;
    let data;
    let count = 0;

    displayLoading();
    await getDateAndTime();
    await displayCamundaVersion();

    // const dataDisplayElement = document.getElementById('dataDisplay');
    // dataDisplayElement.innerHTML = '';

    if (processId) {

        const processIds = processId.split(',');
        for (let i = 0; i < processIds.length; i++) {

            data = await getProcessById(processIds[i]);
            const countResponse = await getProcessCount(processIds[i]);
            count += countResponse.count;
        }

    } else {
        data = await getAllProcesses();
        const countResponse = await countAllProcesses();
        count = countResponse.count;
    }

    await printDisplayElements(data, count);
};


const printDisplayElements = async (data, count) => {
    const dataDisplayElement = document.getElementById('dataDisplay');
    dataDisplayElement.innerHTML = '<p>Process count: ' + count + '</p>' + '<pre><code class="json">' + JSON.stringify(data, null, 2) + '</code></pre>';
}

const getCamundaVersion = async () => {
    const endpoint = new URL(`http://localhost:8080/engine-rest/version`);
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
}

const displayCamundaVersion = async () => {
    const versionElement = document.getElementById('version');
    try {
        const version = await getCamundaVersion();
        versionElement.innerText = `Current Camunda version: ${version.version}`;
    } catch (error) {
        console.error(error);
        versionElement.innerText = 'Failed to get Camunda version';
    }
}



