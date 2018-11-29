const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} = require('graphql');
const chopListDb = require("../../database/chopListDb");

const UserIdType = new GraphQLObjectType({
  name: 'UserId',
  fields: {
    id: {type: new GraphQLNonNull(GraphQLInt)}
  }
});
const RegisterUserInputType = new GraphQLInputObjectType({
  name: 'RegisterUserInput',
  fields: {
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)}
  }
});

module.exports = {
  type: UserIdType,
  args: {
    input: { type: new GraphQLNonNull(RegisterUserInputType) }
  },
  resolve(obj, {input}, {msPool}) {
    return chopListDb(msPool).registerUser(input);
  }
}
