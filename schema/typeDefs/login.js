const {gql} = require("apollo-server-koa");

const typeDef = gql`
  type Login {
    auth: String!
  }
`
module.exports = typeDef;
