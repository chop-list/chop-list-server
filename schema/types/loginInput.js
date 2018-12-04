const {GraphQLInputObjectType,
  GraphQLString, GraphQLNonNull} = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'LoginInputType',
  fields:{
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
})
