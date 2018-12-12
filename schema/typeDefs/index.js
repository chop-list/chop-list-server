const {readdirSync} = require("fs");

const typedefs = [];

let files = readdirSync(__dirname);
for(let i in files) {
  // eslint-disable-next-line security/detect-object-injection
  let file = files[i];
  if(file !== "index.js") {
    try {
      // eslint-disable-next-line security/detect-non-literal-require
      typedefs.push(require("./" + file))
    } catch (error){
      log.warn(`Error loading typedef ${file}: ${error}`)
    }

  }
}
module.exports = typedefs;
