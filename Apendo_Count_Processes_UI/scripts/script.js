async function getProcessCount() {
  const processId = document.getElementById('processIdGet').value;
  let endpoint;
  let body = {};

  body = await getDateAndTime();
  body.processDefinitionKey = processId;
  body = JSON.stringify(body);

  console.log('KOLLA: ' + ' ' + body);

  endpoint = `http://localhost:8080/engine-rest/history/process-instance/count`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

const handleSubmit = async (event) => {
  document.addEventListener('DOMContentLoaded', () => {});
  event.preventDefault();

  const processId = document.getElementById('processIdGet').value;
  let dataDisplayElement = document.getElementById('dataDisplay');

  let data;
  let count;

  displayLoading();
  await getDateAndTime();

  if (processId) {
    data = await getProcessById(processId);
  } else {
    data = await getAllProcesses();
  }

  const countResponse = await getProcessCount();
  count = countResponse.count;

  dataDisplayElement = document.getElementById('dataDisplay');
  dataDisplayElement.innerHTML =
    '<p>Process count: ' +
    count +
    '</p>' +
    '<pre><code class="json">' +
    JSON.stringify(data, null, 2) +
    '</code></pre>';
};
