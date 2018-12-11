const Koa = require('koa');
const Router = require('koa-router');
const koaGraphql = require('koa-graphql');
const mysql = require('promise-mysql');
const schema = require('../schema');
const jwt = require("jsonwebtoken");

module.exports = (params) => {

  let port = params.port || 8000
  global.secret = params.secret || process.env.SECRET || "SanRoqueDogsDoesNotHaveATail";

  const app = new Koa();
  const router = new Router();

  router.all('/graphql', (ctx) => {
    let user = undefined;
      if(ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] == 'Bearer') {
      try {
        user = jwt.verify(ctx.headers.authorization.replace(/^Bearer /, ''), secret).user;
      } catch(e) {
        ctx.response.status = 400
        ctx.response.error = "Invalid credentials";
        return ctx;
      }
    }
    return koaGraphql({
      schema: schema,
      graphiql: true,
      context: { user: user, "msPool": mysql.createPool(require("../config/mysql")) }
    })(ctx);
  })

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(port);

}
