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
    id: {type: new GraphQLNonNull(GraphQLInt)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    status: {type: new GraphQLNonNull(GraphQLString)}
  }
});
const SignUpInputType = new GraphQLInputObjectType({
  name: 'SignUpInput',
  fields: {
    firstName: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  }
});

module.exports = {
  type: UserIdType,
  args: {
    input: { type: new GraphQLNonNull(SignUpInputType) }
  },
  resolve(obj, {input}, {msPool}) {
    return chopListDb(msPool).signUp(input);
  }
}
