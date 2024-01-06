const { readFile, read } = require("fs");

console.log("Executing the First task ");

readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("Completed the first task");
});

console.log("Starting next task");

// Since readFile(); is asynchronous first the line 3 gets executed then when line 5 is encountered, it directly moves to line 14 while waiting for readFile(); to complete it's execution 
//THIS IS THE OUTPUT -> 
// Executing the First task 
// Starting next task
// Hello this is the first text file. 
// Completed the first task