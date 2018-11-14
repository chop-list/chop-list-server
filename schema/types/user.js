const {GraphQLObjectType, GraphQLString,
    GraphQLNonNull} = require('graphql');

const credentialsType = require('./credentials');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
    }
})