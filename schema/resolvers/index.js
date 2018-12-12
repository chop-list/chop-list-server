module.exports = {
  Query: {
    user: require("./user.js"),
    lists: require("./lists")
  },
  Mutation: {
    login: require("./login")
  }
}
