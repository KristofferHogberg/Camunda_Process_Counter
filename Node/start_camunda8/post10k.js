const ZB = require('zeebe-node');

 const main = async () => {
     const drinks = ['cola zero', 'cola light', 'cola', 'fanta', 'pepsi', 'pepsi max', 'pepsi cherry',
         'vodka', 'beer', 'water', 'coffee', 'tea', 'red wine', 'white wine'];
     const foods = ['vesuvio pizza', 'hawaii pizza', 'salami pizza', 'mexicana pizza', 'steak', 'kebab pizza',
         'kebab with bread', 'pea soup', 'pasta', 'salmon', 'tuna', 'kebabroll', 'bread', 'chicken pizza'];

     function getRandomInt(max) {
         return Math.floor(Math.random() * max);
     }

     let zbc = new ZB.ZBClient('localhost:26500');

     const post = async () => {
         const result = await zbc.createProcessInstance({
             bpmnProcessId: 'Process_0zotkvz',
             variables: {
                 drink: drinks[getRandomInt(drinks.length - 1)],
                 pizza: foods[getRandomInt(foods.length - 1)]
             }
         })
         console.log(result)
     }

     for (let i = 1; i <= 1; i++) {
         await post();
     }
}
main();