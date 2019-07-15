import bcrypt from 'bcrypt';

const hashPassword = (password, saltRounds) => bcrypt.hash(password, saltRounds)
  .then(hash => hash)
  .catch(error => error);

export default hashPassword;
