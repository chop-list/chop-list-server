const {
  GraphQLNonNull
} = require("graphql");
const chopListDb = require("../../database/chopListDb");
const LoginInputType = require("../types/loginInput");
const LoginType = require("../types/login");

module.exports = {
  type: LoginType,
  args: {
    input: { type: new GraphQLNonNull(LoginInputType) }
  },
  resolve(obj, {input}, {msPool}) {
    return chopListDb(msPool).login(input);
  }
}
