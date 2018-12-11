const {GraphQLObjectType} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: require("./user")
  }
})
