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
