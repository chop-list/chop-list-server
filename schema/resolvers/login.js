const chopListDb = require("../../database/chopListDb");
const jwt = require("jsonwebtoken");

module.exports = async (_, args, {user, msPool}) => {
  if(!user) {
    throw new Error("You are not authenticated!")
  }
  return chopListDb(msPool).login(args.username, args.password).then(id => {
    let auth = jwt.sign({user: id}, secret, {expiresIn: '1y'});
    return {auth: auth}
  });
}
