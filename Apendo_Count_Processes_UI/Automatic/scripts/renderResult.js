const renderResult = (result) => {
    const dataDisplayElement = document.getElementById('dataDisplay');
    dataDisplayElement.innerHTML = `<p>A total of ${result.count} process instances have been run</p>`
}