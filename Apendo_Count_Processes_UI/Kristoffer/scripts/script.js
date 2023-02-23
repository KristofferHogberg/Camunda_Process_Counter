async function getProcessCount() {
  const processId = document.getElementById('processIdGet').value;
  let endpoint;

  if (processId) {
    const process = await getProcessById(processId);

    console.log(process.length);
    return { count: process.length };
  } else {
    endpoint = new URL(
      // `http://localhost:8080/engine-rest/history/activity-instance/count`
      `http://localhost:8080/engine-rest/history/process-instance/count`
    );
  }
  // endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
  const response = await fetch(endpoint);
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

async function handleSubmit(event) {
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
}

async function getDateAndTime() {
  const form = document.querySelector('#process-form');
  const startDateInput = form.querySelector('#start-date');
  const startTimeInput = form.querySelector('#start-time');
  const endDateInput = form.querySelector('#end-date');
  const endTimeInput = form.querySelector('#end-time');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const startDate = startDateInput.value;
    const startTime = startTimeInput.value;
    const endDate = endDateInput.value;
    const endTime = endTimeInput.value;

    const body = {
      start: new Date(`${startDate}T${startTime}`).toISOString(),
      end: new Date(`${endDate}T${endTime}`).toISOString(),
    };
    console.log('THIS IS THE DATE BODY: ' + ' ' + JSON.stringify(body));
  });
}
