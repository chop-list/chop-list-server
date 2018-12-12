const {gql} = require("apollo-server-koa");

const typeDef = gql`
  type Category{
    id: Int!
    name: String!
    items: [Item]
  }
`

module.exports = typeDef;
