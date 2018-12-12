const chopListDb = require("../../database/chopListDb");

module.exports = async (_, args, {user, msPool}) => {
  if(!user) {
    throw new Error("You are not authenticated!")
  }
  return chopListDb(msPool).getUser(user);
}
