const os = require('os');
const path = require('path');

const user = os.userInfo();
console.log("Username: ", user.username);

console.log("The system uptime is ", os.uptime(), "seconds");

const currentOs = {
     name: os.type(),
     release: os.release(),
     totalMem: os.totalmem(),
     freeMem: os.freemem(),

}

console.log(currentOs);

const filePath = path.join(__dirname, '/content/', 'subfolder', 'test');
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve(__dirname, '/content/', 'subfolder', 'test' );
console.log(absolute);