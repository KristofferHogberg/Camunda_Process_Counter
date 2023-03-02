const getDateAndTime = async () => {
  const form = document.querySelector('#process-form');
  const startDateInput = form.querySelector('#start-date');
  const startTimeInput = form.querySelector('#start-time');
  const endDateInput = form.querySelector('#end-date');
  const endTimeInput = form.querySelector('#end-time');

  const body = {};

  if (startDateInput.value && startTimeInput.value) {
    body.startedAfter = formatDate(startDateInput.value, startTimeInput.value);
  }

  if (endDateInput.value && endTimeInput.value) {
    body.finishedBefore = formatDate(endDateInput.value, endTimeInput.value);
  }
  return body;
};

const formatDate = (dateString, timeString) => {
  const date = new Date(`${dateString}T${timeString}`);
  const offset = date.getTimezoneOffset() / -60;
  const offsetString =
    (offset > 0 ? '-' : '+') + ('00' + Math.abs(offset) + '00').slice(-4);
  const formattedDate = `${date.toISOString().slice(0, 19)}.000${offsetString}`;
  return formattedDate;
};
