const axios = require('axios');
const main = async () => {
    const drinks = ['cola zero', 'cola light', 'cola', 'fanta', 'pepsi', 'pepsi max', 'pepsi cherry',
        'vodka', 'beer', 'water', 'coffee', 'tea', 'red wine', 'white wine'];
    const foods = ['vesuvio pizza', 'hawaii pizza', 'salami pizza', 'mexicana pizza', 'steak', 'kebab pizza',
        'kebab with bread', 'pea soup', 'pasta', 'salmon', 'tuna', 'kebabroll', 'bread', 'chicken pizza'];
    const url = 'http://wsprakt4.apendo.se:8080/engine-rest/process-definition/key/main-process-1/start';
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    for (let i = 1; i <= 10000; i++) {
        const body = {
            "variables": {
                "food" : {
                    "value" : drinks[getRandomInt(drinks.length - 1)],
                    "type": "String"
                },
                "drink" : {
                    "value" : foods[getRandomInt(foods.length - 1)],
                    "type": "String"
                }
            }
        }
        try{
            let result = await axios.post(url, body);
            console.log(`Success number ${i}: status ${result.status}`);
        }catch(e){
            console.log(`Failed ${i}: ${e.message}`);
        }
    }

}


main().then(() => {
    console.log("success")
}).catch(() => {
    console.log("error")
});
