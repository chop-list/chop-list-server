const {gql} = require("apollo-server-koa");

const typeDef = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    status: String
    username: String!
  }
`

module.exports = typeDef;
