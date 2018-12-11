const { GraphQLSchema } = require('graphql');
const RootQueryType = require("./queries");
const RootMutationType = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
