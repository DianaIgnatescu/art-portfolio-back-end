const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'This is not what I signed up for, but I shall stay';

function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

module.exports = {
  authenticate,
  jwtKey,
};
