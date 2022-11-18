const Jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  console.log(req.headers,"d,ck");
  let authHeader = req.headers["auth-token"];
  console.log(authHeader,"dmcjmccm");
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
