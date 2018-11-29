const server = require("./lib/server");
const program = require('commander');

//Init logger
require('./lib/util/log');

program
  .version(require("./package.json").version)
  .option("-p --port [port]", "Port to use", 8000)
  .option("-v --verbose");

if (program.verbose) {
  log.level = "debug";
}

server({ port: program.port });

