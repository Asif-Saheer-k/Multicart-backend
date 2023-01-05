const Jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {

  let authHeader = req.headers["auth-token"];
  if (authHeader == undefined) {
    res.status(401).send("No Token Provided" );
  }
  let token = authHeader;
  Jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
    if (err) {
       res.status(500).send("Authentication Failed")
    } else {
      next();
    }
  });
}
module.exports = { verifyToken };
