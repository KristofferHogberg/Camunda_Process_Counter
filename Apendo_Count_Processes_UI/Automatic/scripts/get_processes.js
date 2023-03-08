
const getProcesses = async () => {
    const url = "http://192.168.2.196:9200/operate-process-8.1.8_/_search"

    const response = await fetch(url);
    const processes = await response.json();
    return processes.hits.hits;
}

let loginForm = document.getElementById("process-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let test = await  getProcesses();
    console.log(test)
    printDisplayElements(test.length)
});

const printDisplayElements = (count) => {
    const dataDisplayElement = document.getElementById('dataDisplay');
    dataDisplayElement.innerHTML =
        `<p>Total amount of processes found: ${count}</p>`
}