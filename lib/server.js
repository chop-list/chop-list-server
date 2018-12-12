const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const mysql = require('promise-mysql');
const typeDefs = require("../schema/typeDefs");
const resolvers = require("../schema/resolvers");

module.exports = (params) => {

  let port = params.port || 8000;
  let host = params.host || 'localhost';

  let msPool = mysql.createPool(require("../config/mysql"))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => {
      let user = 1;
      return {user , msPool};
    }
  });

  const app = new Koa();
  server.applyMiddleware({ app });
  app.listen(port, host, () =>
    log.info(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
  );
}
