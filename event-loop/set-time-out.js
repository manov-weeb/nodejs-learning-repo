//will execute this first 
console.log('first');
setTimeout(() => {
  console.log('second');
}, 0); //since setTimeout is asynchronus, it will wait even if the timeout is 0sec. 
console.log('third'); //this gets exceuted 

//hence this is the output
// first
// third
// second