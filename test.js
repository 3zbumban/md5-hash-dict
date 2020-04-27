const { analysePath, analyseArray } = require("./hasher");

const testPath = "";
const testPath2 = "";

// analysePath(testPath2);
const result = analyseArray([testPath, testPath2], ["mp3"]);
console.log(JSON.stringify(result));
