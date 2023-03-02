const ZB = require('zeebe-node');

 const main = async () => {
     const drinks = ['cola zero', 'cola light', 'cola', 'fanta', 'pepsi', 'pepsi max', 'pepsi cherry',
         'vodka', 'beer', 'water', 'coffee', 'tea', 'red wine', 'white wine'];
     const foods = ['vesuvio pizza', 'hawaii pizza', 'salami pizza', 'mexicana pizza', 'steak', 'kebab pizza',
         'kebab with bread', 'pea soup', 'pasta', 'salmon', 'tuna', 'kebabroll', 'bread', 'chicken pizza'];
    const processIds = ['HP_0u23yeh', 'HP_10nqo5q'];
    let time = 2;
     function getRandomInt(max) {
         return Math.floor(Math.random() * max);
     }

     let zbc = new ZB.ZBClient('localhost:26500');

     const post = async () => {
         const result = await zbc.createProcessInstance({
             bpmnProcessId: processIds[getRandomInt(processIds.length)],
             variables: {
                 drink: drinks[getRandomInt(drinks.length)],
                 pizza: foods[getRandomInt(foods.length)],
                 time: "PT" + time + "S"
             }
         })
         console.log(result)
     }

     for (let i = 1; i <= 12000; i++) {
         await post();
         time += getRandomInt(10);
     }
}
main();