const formatStartDate = () => {
    // const processInstanceId = document.getElementById("processInstanceId").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    return new Date(startDate + " " + startTime + 'Z');
}
const formatEndDate = () => {
    // const processInstanceId = document.getElementById("processInstanceId").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;
    return new Date(endDate + " " + endTime + 'Z');
}

let loginForm = document.getElementById("process-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const before = formatStartDate();
    const after = formatEndDate();
    console.log(after.valueOf())
    const processes = document.getElementById("processes");
    let payload = formatPayload(processes, before, after);

    const response = await fetch('192.168.2.196:9200/_count', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload
    });
    const json = await response.json();
});