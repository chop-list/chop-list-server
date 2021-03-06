const {gql} = require("apollo-server-koa");

const typeDef = gql`
  type List {
    id: Int!
    name: String!
    role: String!
    categories: [Category]
  }
`

module.exports = typeDef;
