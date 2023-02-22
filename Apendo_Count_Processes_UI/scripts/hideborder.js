const dataDisplayElement = document.getElementById('dataDisplay');
if (data) {
  dataDisplayElement.innerHTML =
    '<pre><code class="json">' +
    JSON.stringify(data, null, 2) +
    '</code></pre>';
} else {
  dataDisplayElement.innerHTML = '';
}
