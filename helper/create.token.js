const jwt = require("jsonwebtoken");

const minAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "my scret key", {
    expiresIn: minAge,
  });
};

module.exports = createToken;
