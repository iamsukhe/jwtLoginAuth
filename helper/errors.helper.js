const handleErrors = (err) => {
  const error = { email: "", password: "" };

  if (err.message === "incorrect email") {
    error.email = "Email is incorrect";
  }
  if (err.message === "incorrect password") {
    error.password = "Password is incorrect";
  }

  if (err.code === 11000) {
    error.email = "Email already registered";
    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports = handleErrors;
