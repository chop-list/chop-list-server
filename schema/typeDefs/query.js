const { gql } = require("apollo-server-koa");

module.exports = gql`
  type Query {
    getUser: User
    getLists: [List]
    getList(id: Int!): List
  }
`
