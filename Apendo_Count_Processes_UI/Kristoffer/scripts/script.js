async function getProcessCount(processId) {
    // processId = document.getElementById('processIdGet').value;
    let endpoint;
    let body = {};

    body = await getDateAndTime();
    body.processDefinitionKey = processId;
    body = JSON.stringify(body);

    endpoint = `http://localhost:8080/engine-rest/history/process-instance/count`;

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data;
}

async function getProcessById(processId) {
    const endpoint = new URL(
        `http://localhost:8080/engine-rest/history/process-instance?processDefinitionKey=${processId}`
    );
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);

    return response.json();
}

async function getAllProcesses() {
    const endpoint = new URL(
        `http://localhost:8080/engine-rest/history/process-instance`
    );
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);
    return await response.json();
}

async function countAllProcesses() {
    const endpoint = new URL(
        `http://localhost:8080/engine-rest/history/process-instance/count`
    );
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);

    return await response.json();
}

const handleSubmit = async (event) => {

    document.addEventListener('DOMContentLoaded', () => {
    });
    event.preventDefault();

    const processId = document.getElementById('processIdGet').value;
    let data;
    let count = 0;

    showLoading();
    await getDateAndTime();
    await displayCamundaVersion();

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
    dataDisplayElement.innerHTML =
        '<p>Process count: ' +
        count +
        '</p>' +
        '<pre><code class="json">' +
        JSON.stringify(data, null, 2) +
        '</code></pre>';
}

async function getCamundaVersion() {
    const endpoint = new URL(
        `http://localhost:8080/engine-rest/version`
    );
    // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
}

async function displayCamundaVersion() {
    const versionElement = document.getElementById('version');
    try {
        const version = await getCamundaVersion();
        versionElement.innerText = `Current Camunda version: ${version.version}`;
    } catch (error) {
        console.error(error);
        versionElement.innerText = 'Failed to get Camunda version';
    }
}
