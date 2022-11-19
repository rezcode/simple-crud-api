const db = require("../config/db");

const registerUser = (props) => {
  const { fullName, email, password } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)",
      [fullName, email, password],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  registerUser,
};
