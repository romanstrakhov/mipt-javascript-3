for (let i = 0; i < 5; i++) {
    let counter = require('./counter.js')();
    
    console.log(counter);
}

const add = require('./add.js');

console.info(add);