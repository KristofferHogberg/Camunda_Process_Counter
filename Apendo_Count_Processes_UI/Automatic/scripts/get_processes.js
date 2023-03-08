
const getProcesses = async () => {
    const response = await fetch("http://192.168.2.196:9200/operate-process-8.1.8_/_search");
    const processes = await response.json();
    return processes.hits.hits;
}


window.onload = async () => {
    let processes = await getProcesses();
    showFoundProcesses(processes);
}

const showFoundProcesses = (processes) => {
    let processesByVersion = groupProcessesByVersion(processes);
    let headProcesses = popHeadProcesses(processesByVersion);
    const dataDisplayElement = document.getElementById('foundProcesses');
    dataDisplayElement.innerHTML = `<h2>Found Processes</h2>`
    dataDisplayElement.innerHTML +=
        `<p>Unique processes: ${processesByVersion.length + headProcesses.length}</p>`;

    let text = `<p>Head Processes: ${headProcesses.length}`;
    headProcesses.forEach(x => {
        text += `<br>${x[0]._source.bpmnProcessId}: ${x.length} version(s)`
    });
    text += '</p>';
    dataDisplayElement.innerHTML += text;
}

/**
 * @param {Array} processes
 * @param {Object} processes._source
 */
const groupProcessesByVersion = (processes) => {
    if (processes.length === 0) return [];
    let groupedProcesses = [];
    let tempArr = [];
    processes.sort(function (a, b) {
        if (a._source.bpmnProcessId === b._source.bpmnProcessId) return 0;
        return a._source.bpmnProcessId > b._source.bpmnProcessId ? 1 : -1;
    })
    processes.forEach(x => {
        if (tempArr.length === 0){
            tempArr.push(x)
        }
        else if (tempArr[0]._source.bpmnProcessId === x._source.bpmnProcessId){
            tempArr.push(x)
        }
        else {
            groupedProcesses.push(tempArr);
            tempArr = [];
            tempArr.push(x)
        }
    });
    groupedProcesses.push(tempArr);

    return groupedProcesses;
}

const popHeadProcesses = (processes) => {
    let headProcesses = [];
    for (let i = processes.length - 1; i >= 0; i--) {
        const process = processes[i][0];
        if (process._source.bpmnProcessId.includes("HP_", 0)){
            headProcesses.push(processes.splice(i, 1).pop());
        }
    }
    return headProcesses;
}
