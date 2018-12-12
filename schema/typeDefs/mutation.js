const {gql} = require("apollo-server-koa");

module.exports = gql`
  type Mutation {
    login(username: String!, password: String!): Login
}`
