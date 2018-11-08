const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return "world"
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQueryType
});