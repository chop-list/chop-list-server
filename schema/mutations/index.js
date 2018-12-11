const {GraphQLObjectType} = require("graphql");
const SignUpMutation = require("./signUp");
const LoginMutation = require("./login");

module.exports = new GraphQLObjectType( {
  name: "RootMutation",
  fields: () => ({
    Login: LoginMutation,
    signup: SignUpMutation
  })
});
