const jwt = require("jsonwebtoken");
const config = require("../config/auth");

function authenticateJWT(req, res, next){
  const authHeader = req.header("Authorization");

  if (authHeader){
    const token = authHeader;

    jwt.verify(token, config.secret, (err, user) => {
      if (err){
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = authenticateJWT;
