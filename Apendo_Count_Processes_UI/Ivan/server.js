 const express = require('express')
var cors = require('cors')
const app = express()
const port = 7777
const axios = require('axios');
app.use(cors())
async function main() {
    async function equestBody(id) {
        console.log(id);
        let payload = {
            "query": {
                "match": {
                    "bpmnProcessId": id
                }
            }
        };
    
        let res = await axios.post('http://wsprakt3.apendo.se:9200/_search/', payload);
    
        let data = res.data.hits.total;
        return data;
    }
    
    app.get('/:id', async (req, res) => {
      res.send(await doPostRequest(req.params.id))
    });
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
}
main();