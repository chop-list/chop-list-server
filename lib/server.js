const Koa = require('koa');
const Router = require('koa-router');
const koaGraphql = require('koa-graphql');
const mysql = require('promise-mysql');
const schema = require('../schema');
const jwt = require("jsonwebtoken");

module.exports = (params) => {

  let user = undefined;
  let port = params.port || 8000
  global.secret = params.secret || process.env.SECRET || "SanRoqueDogsDoesNotHaveATail";

  const app = new Koa();
  const router = new Router();

  app.use(async (ctx,next) => {
    if(ctx.headers.authorization) {
      user = jwt.verify(ctx.headers.authorization, secret).user;
    }
    log.debug("User: " + JSON.stringify(user, null, 2));
    await next();
  });

  router.all('/graphql', koaGraphql({
    schema: schema,
    graphiql: true,
    context: { "user": user, "msPool": mysql.createPool(require("../config/mysql")) }
  }))

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(port);

}
