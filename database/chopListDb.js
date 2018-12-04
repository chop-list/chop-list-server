const humps = require("humps");

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
    }
  }
}
