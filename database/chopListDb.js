const humps = require("humps");
const ACTIVE_STATUS = "active";

module.exports = msPool => {
  return {
    getUser(id) {
      return msPool.query(`SELECT * FROM users_table WHERE id = ${id}`)
        .then((rows) => {
          return humps.camelizeKeys(rows[0])
        });
    },
    signUp(user) {
      let sqlUsersTable = 'INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`, `status`) VALUES (?, ?, ?, ?)'
      let sqlCredentiasTable = 'INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) values (true, "USER/PASSWORD", ?, ?, ?)';
      Object.assign(user, {status: "registered"});
      return msPool.query("START TRANSACTION")
        .then(() => msPool.query(sqlUsersTable, [user.firstName, user.lastName, user.email, user.status]))
        .then((result) => Object.assign(user, {id: result.insertId}))
        .then(() => msPool.query(sqlCredentiasTable, [user.username, user.password, user.id]))
        .then(() => msPool.query("COMMIT"))
        .then(() => ({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status
        }))
    },
    login(credentials) {
      let sql = 'SELECT users_table.id, users_table.status ' +
                'FROM `chop_list_db`.`users_table`, `chop_list_db`.`credentials_table` ' +
                'WHERE `chop_list_db`.`users_table`.id = `chop_list_db`.`credentials_table`.user_id ' +
                'AND `credentials_table`.`primary` = true ' +
                'AND `credentials_table`.`type` = "USER/PASSWORD" ' +
                'AND `credentials_table`.`username` = ? ' +
                'AND `credentials_table`.`password` = ? ';
      return msPool.query(sql, [credentials.username, credentials.password])
        .then((result ) => {
          if(result && result.length == 1 && result[0].status == ACTIVE_STATUS) {
            return result[0].id;
          } else {
            return ("Forbidden!")
          }
        })
    }
  }
}
