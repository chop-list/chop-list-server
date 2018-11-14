const humps = require("humps");

module.exports = msPool => {
    return {
        getUser(id) {
            return msPool.query(`select * from users_table where id = ${id}`)
                .then((rows) => {
                    return humps.camelizeKeys(rows[0])
                });
        }
    }
}