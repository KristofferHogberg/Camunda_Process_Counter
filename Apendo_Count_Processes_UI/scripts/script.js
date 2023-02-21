async function getAllProcesses() {
  const processId = document.getElementById('processIdGet').value;

  if (!processId) {
    alert('Please input a process id.');
    return;
  }

  const endpoint = new URL(
    `http://localhost:8080/engine-rest/history/process-instance?processDefinitionKey=${processId}`
  );
  endpoint.searchParams.set('token', 'MY_TOKEN_HERE');
  const response = await fetch(endpoint);

  const data = await response.json();
  console.log(data);

  const dataDisplayElement = document.getElementById('dataDisplay');
  dataDisplayElement.innerHTML = JSON.stringify(data);
}
