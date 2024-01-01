const fs = require("fs");

fs.readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(result);
});

fs.writeFile(
  "./content/new-file-async",
  "Writing to a file using Asyncronous FS.",
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Done with the task!");
  }
);

console.log("Starting the task");
