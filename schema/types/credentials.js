const {GraphQLObjectType,
    GraphQLString, GraphQLNonNull} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'CredentialsType',
    fields:{
        username: new GraphQLNonNull(GraphQLString),
        password: new GraphQLNonNull(GraphQLString)
    }
})
