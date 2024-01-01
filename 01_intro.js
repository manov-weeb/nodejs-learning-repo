console.log(__dirname);
console.log(__filename);
console.log(process);

// const amount = 12;

// if(amount > 10)
//      console.log("Amount is greater");
// else 
//      console.log("amount is less");
const names = require('./02_utils');
// console.log(names);
const func = require('./03_firstModule');
func(names.name1);
const data = require('./04_alt_flav');
console.log(data);
// const save = require('./05_mindGrenade');