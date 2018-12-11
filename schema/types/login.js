const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'LoginType',
  fields:{
      auth: {type: GraphQLString}
  }
})
