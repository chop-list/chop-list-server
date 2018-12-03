const {GraphQLObjectType, GraphQLString,
    GraphQLNonNull} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
    }
})
