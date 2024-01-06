const { writeFileSync, createReadStream, readFileSync } = require("fs");

const stream = createReadStream(
  "./content/big.txt",
  { highWaterMark: 9000000 },
);

// for (let i = 0; i < 10000; i++) {
//   writeFileSync("./content/big.txt", `Namaste for ${i} time/s  `, {
//     flag: "a",
//   });
// }
// console.log("nice");

stream.on("data", (result) => {
  console.log(result);
});

// const some = readFileSync("./content/big.txt" );
// console.log(some);
