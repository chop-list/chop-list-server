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

    getLists(userId, listIds = []) {
      let sql = "SELECT lists_table.id 'id', lists_table.name 'name', lists2users_table.role 'role' " +
        "FROM `chop_list_db`.`lists_table`, `chop_list_db`.`users_table`, `chop_list_db`.`lists2users_table` " +
        "WHERE lists2users_table.user_id = users_table.id " +
        "AND lists2users_table.list_id = lists_table.id " +
        "AND users_table.id = ? "

      if(listIds && listIds.length > 0) {
        sql += "AND lists_table.id in (?) "
      }

      return msPool.query(sql, [userId, listIds])
        .then((rows) => {
          return this.getListCategories(userId, rows.map(row => row.id))
            .then(categories => {
              rows.map(row => row.categories = categories.filter(category => category.listId === row.id))
              return humps.camelizeKeys(rows)
            })
        });
    },

    getListCategories(userId, listIds) {
      const sql = "SELECT lists_table.id 'list_id', categories_table.name 'name', categories_table.id 'id' " +
      "FROM `chop_list_db`.`lists_table`, `chop_list_db`.`categories_table` " +
      "WHERE categories_table.list_id = lists_table.id " +
      "AND lists_table.id in (?) ";
      return msPool.query(sql, [userId, listIds])
        .then(rows => {
          rows = humps.camelizeKeys(rows)
          return this.getCategoryItems(rows.map(row => row.id))
            .then(items => {
              rows.map(row => row.items = items.filter(item => item.categoryId === row.id))
              return rows
            })
        })
    },

    getCategoryItems(categoryIds) {
      const sql = "SELECT categories_table.id categoryId, items_table.id, items_table.name, items_table.checked " +
      "FROM `chop_list_db`.`items_table`, `chop_list_db`.`categories_table` " +
      "WHERE categories_table.id = items_table.category_id " +
      "AND categories_table.id in (?) "
      return msPool.query(sql, [categoryIds])
      .then(rows => {
        rows = humps.camelizeKeys(rows)
        return rows
      })
    },

    signUp(user) {
      let sqlUsersTable = 'INSERT INTO `chop_list_db`.`users_table` (`first_name`, `last_name`, `email`, `status`) VALUES (?, ?, ?, ?)'
      let sqlCredentiasTable = 'INSERT INTO `chop_list_db`.`credentials_table` (`primary`, `type`, `username`, `password`, `user_id`) values (true, "USER/PASSWORD", ?, ?, ?)';
      Object.assign(user, { status: "registered" });
      return msPool.query("START TRANSACTION")
        .then(() => msPool.query(sqlUsersTable, [user.firstName, user.lastName, user.email, user.status]))
        .then((result) => Object.assign(user, { id: result.insertId }))
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
    login(username, password) {
      let sql = 'SELECT users_table.id, users_table.status ' +
        'FROM `chop_list_db`.`users_table`, `chop_list_db`.`credentials_table` ' +
        'WHERE `chop_list_db`.`users_table`.id = `chop_list_db`.`credentials_table`.user_id ' +
        'AND `credentials_table`.`primary` = true ' +
        'AND `credentials_table`.`type` = "USER/PASSWORD" ' +
        'AND `credentials_table`.`username` = ? ' +
        'AND `credentials_table`.`password` = ? ';
      return msPool.query(sql, [username, password])
        .then((result) => {
          if (result && result.length == 1 && result[0].status == ACTIVE_STATUS) {
            return result[0].id;
          } else {
            throw new Error("Forbidden!")
          }
        })
    }
  }
}
