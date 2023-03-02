async function submitForm() {
    const form = document.querySelector('form');
    const processInstanceId = form.elements['processInstanceId'].value;
  
    const startDateInput = form.querySelector('#start-date');
    const startTimeInput = form.querySelector('#start-time');
    const endDateInput = form.querySelector('#end-date');
    const endTimeInput = form.querySelector('#end-time');
  
    const startDate = startDateInput.value;
    const startTime = startTimeInput.value;
    const endDate = endDateInput.value;
    const endTime = endTimeInput.value;
  
    const body = {
      start: new Date(`${startDate}T${startTime}`).toISOString(),
      end: new Date(`${endDate}T${endTime}`).toISOString(),
    };
  
    const url = `http://localhost:8080/engine-rest/process-instance/${processInstanceId}/statistics`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  
    const data = await response.json();
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = JSON.stringify(data);
  }
  