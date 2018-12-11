const UserType = require("../types/user");
const chopListDb = require("../../database/chopListDb");

module.exports = {
  type: UserType,
  description: "User data identified by a key",
  args: {},
  resolve(obj, args, {user, msPool}) {
    if(!user) {
      throw new Error("You are not authenticated!")
    }
    log.debug("Got Request for user id: " + user);
    return chopListDb(msPool).getUser(user);
  }
}
