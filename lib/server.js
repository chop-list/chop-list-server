const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const mysql = require('promise-mysql');
const auth = require("./auth");
const typeDefs = require("../schema/typeDefs");
const resolvers = require("../schema/resolvers");

module.exports = (params) => {

  let port = params.port || 8000;
  let host = params.host || 'localhost';
  global.secret = params.secret || process.env.SECRET || "SanRoqueDogsDoesNotHaveATail";

  let msPool = mysql.createPool(require("../config/mysql"))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => {
      return { user: auth.getUser(ctx) , msPool };
    }
  });

  const app = new Koa();
  server.applyMiddleware({ app });
  app.listen(port, host, () =>
    log.info(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
  );
}
