const { graphql } = require("graphql");
const schema = require("../schema");
//Init logger
require('./util/log');

const query = "{hello}";
log.info("--------------------------------")
graphql(schema, query).then(result => {
    log.debug(JSON.stringify(result, null, 2))
});