const { gql } = require("apollo-server-koa");

module.exports = gql`
  type Query {
    user: User
    lists: [List]
  }
`
