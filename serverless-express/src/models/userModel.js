const { v4: uuid } = require('uuid');

const userModel = (firstname, lastname, email) => {
  const now = new Date();

  return {
    id: uuid(),
    firstname,
    lastname,
    email,
    createdAt: now.toISOString(),
  };
};

module.exports = { userModel };