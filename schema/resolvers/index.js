module.exports = {
  Query: {
    getUser: require("./getUser.js"),
    getLists: require("./getLists"),
    getList: require("./getList")
  },
  Mutation: {
    login: require("./login")
  }
}
