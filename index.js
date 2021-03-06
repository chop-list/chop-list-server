const server = require("./lib/server");
const program = require('commander');

//Init logger
require('./lib/util/log');

program
  .version(require("./package.json").version)
  .option("-p --port [port]", "Port to use", 8000)
  .option("--host [hostname]", "Server hostname", "localhost")
  .option("-s --secret [secret]", "Secret passphrase for encoding tokens")
  .option("-v --verbose");

if (program.verbose) {
  log.level = "debug";
}

server({ port: program.port });

