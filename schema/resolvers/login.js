const chopListDb = require("../../database/chopListDb");
const auth = require("../../lib/auth");

module.exports = async (_, args, {msPool}) => {
  return chopListDb(msPool).login(args.username, args.password).then(auth.sign);
}
