const {
  GraphQLNonNull
} = require("graphql");
const chopListDb = require("../../database/chopListDb");
const LoginInputType = require("../types/loginInput");
const LoginType = require("../types/login");
const jwt = require("jsonwebtoken");

module.exports = {
  type: LoginType,
  args: {
    input: { type: new GraphQLNonNull(LoginInputType) }
  },
  resolve(obj, {input}, {msPool}) {
    return chopListDb(msPool).login(input).then(id => ({auth: jwt.sign({user: id}, secret)}));
  }
}
