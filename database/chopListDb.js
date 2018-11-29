const humps = require("humps");

module.exports = msPool => {
    return {
        getUser(id) {
            return msPool.query(`SELECT * FROM users_table WHERE id = ${id}`)
                .then((rows) => {
                    return humps.camelizeKeys(rows[0])
                });
        },
        registerUser(user) {
          let sql = 'INSERT INTO `chop_list_db`.`users_table` SET ?'
          return msPool.query(sql, humps.decamelizeKeys(user)).then(result => ({'id': result.insertId}));
        }
    }
}
