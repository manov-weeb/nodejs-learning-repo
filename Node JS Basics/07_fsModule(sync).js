const fs = require("fs");

const first = fs.readFileSync("./content/first.txt", "utf-8");
console.log(first);

fs.writeFileSync(
  "./content/a-new-file.txt",
  `This line is newly appended when it is again run. `,
  { flag: "a" }
);
