const Koa = require('koa');
const Router = require('koa-router');
const koaGraphql = require('koa-graphql');

const schema = require('../schema');

module.exports = (params) => {

    let port = params.port || 8000

    const app = new Koa();
    const router = new Router();

    router.all('/graphql', koaGraphql({
        schema: schema,
        graphiql: true
    }))
    app.use(router.routes()).use(router.allowedMethods())

    app.listen(port);

}