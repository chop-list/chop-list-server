const chopListDb = require("../../database/chopListDb");

module.exports = async (_, args, {user, msPool}) => {
  log.debug("User: " + user);
  log.debug("Pool: " + msPool);
  if(!user) {
    throw new Error("You are not authenticated!")
  }
  log.debug("Got Request for user id: " + user);
  return chopListDb(msPool).getUser(user);
}
