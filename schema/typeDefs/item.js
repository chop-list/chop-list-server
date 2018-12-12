const {gql} = require("apollo-server-koa");

const typeDef = gql`
  type Item{
    id: Int!
    name: String!
    checked: Boolean!
  }
`

module.exports = typeDef;
