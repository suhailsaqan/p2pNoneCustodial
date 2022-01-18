const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config");

exports.createAuthToken = (user) => {
  return jwt.sign({ user }, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = this.createAuthToken(user);
    res.json({ token });
  })(req, res, next);
};

exports.jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "unauthorized" });
    req.user = user;
    next();
  })(req, res);
};

exports.contractAuth = (req, res, next) => {
  if (req.post.author._id.equals(req.user.id) || req.user.admin) return next();
  res.status(401).end();
};
