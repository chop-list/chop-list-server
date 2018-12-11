const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const UserType = require("./types/user");
const chopListDb = require("../database/chopListDb");
const SignUpMutation = require("./mutations/signUp");
const LoginMutation = require("./mutations/login");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      description: "User data identified by a key",
      args: {},
      resolve(obj, args, { user, msPool }) {
        if(!user) {
          throw new Error("You are not authenticated!")
        }
        return chopListDb(msPool).getUser(args.id);
      }
    }
  }
})

const RootMutationType = new GraphQLObjectType( {
  name: "RootMutation",
  fields: () => ({
    Login: LoginMutation,
    signup: SignUpMutation
  })
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
