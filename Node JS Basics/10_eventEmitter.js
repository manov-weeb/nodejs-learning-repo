const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log("data recieved of", name);
});

customEmitter.on("response", (name, id) => {
  console.log("also some other data recived on response", id);
});

customEmitter.emit("response", "manov", 1052);
