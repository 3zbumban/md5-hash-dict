/* eslint-disable guard-for-in */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
const walk = require("walk");
// const fs = require("fs");
// const path = require("path");
const md5File = require("md5-file");

let targetExtensions = ["aiff", "wav", "mp3", "midi"];
const result = {};

Array.prototype.contains = function (element) {
  return this.indexOf(element) > -1;
};

function makeEntry(hash, path) {
  let tmp = result[hash];
  if (!tmp) {
    tmp = [];
    tmp.push(path);
  } else if (tmp.contains(path)) {
    // console.log("[hasher] already in paths")
  } else {
    tmp.push(path);
  }
  result[hash] = tmp;
}

// function extend(obj, src) {
//   for (const key in src) {
//     if (src.hasOwnProperty(key)) obj[key] = src[key];
//   }
//   return obj;
// }

function hashFile(filePath) {
  try {
    const hash = md5File.sync(filePath);
    return hash;
  } catch (error) {
    console.log(error.message);
  }
  return false;
}

function getExt(filename) {
  // eslint-disable-next-line no-bitwise
  return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2);
}

const options = {
  listeners: {
    file: (root, fileStats, next) => {
      const fileExt = getExt(fileStats.name);
      if (targetExtensions.contains(fileExt)) {
        const filePath = `${root}\\${fileStats.name}`;
        const fileHash = hashFile(filePath);
        makeEntry(fileHash, filePath);
      }
      next();
    },
    errors: (root, nodeStatsArray, next) => {
      next();
    },
  },
};

function analysePathSync(path) {
  walk.walkSync(path, options);
}

// function analysePath(path) {
//   const walker = walk.walk(path);
//   walker.on("file", (root, fileStats, next) => {
//     const fileExt = getExt(fileStats.name);
//     if (targetExtensions.contains(fileExt)) {
//       const filePath = `${root}\\${fileStats.name}`;
//       const fileHash = hashFile(filePath);
//       makeEntry(fileHash, filePath);
//     }
//     next();
//   });
//   walker.on("errors", (root, nodeStatsArray, next) => {
//     next();
//   });
//   walker.on("end", () => {
//     console.log("all done!");
//     return result;
//   });
// }

function analyseArray(pathArray, extensions) {
  if (extensions) {
    targetExtensions = extensions;
  }
  // let endResult = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pathArray.length; i++) {
    // endResult = extend(endResult, analysePath(pathArray[i]));
    // analysePath(pathArray[i]);
    analysePathSync(pathArray[i]);
  }
  return result;
}

module.exports = {
  analyseArray,
};
