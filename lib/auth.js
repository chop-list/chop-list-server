const jwt = require("jsonwebtoken");

module.exports = {
  sign(userId) {
    log.debug("Sing for user " + userId);
    let auth = jwt.sign({ user: userId }, secret);
    return { auth: auth }
  },
  getUser({ctx}) {
    let header = ctx.request.headers.authorization;
    if (header && header.split(' ')[0] === 'Bearer') {
      try {
        let token = header.replace(/^Bearer /, '');
        let user = jwt.verify(token, secret).user;
        return user;
      } catch (e) {
        ctx.response.status = 400
        ctx.response.error = "Invalid credentials";
        throw new Error("Unauthorized!")
      }
    }
  }
}
