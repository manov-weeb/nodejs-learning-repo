const { readFile, writeFile } = require("fs").promises;
const util = require("util");

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// getText("./content/a-new-file.txt")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const start = async () => {
  try {
    const data = await readFile("./content/first.txt", "utf-8");
    console.log(data);
    const data2 = await readFile("./content/a-new-file.txt", "utf-8");
    console.log(data2);
    await writeFile(
      "./content/resolve-file.txt",
      `this is awesome ${data} and ${data2}`,
      { flag: "a" }
    );
  } catch (error) {
    console.log(error);
  }
};

start();
