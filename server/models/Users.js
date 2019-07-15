const userModel = {
  createUser: `
  INSERT INTO
    users(
      first_name, last_name, email, is_admin, password)
    VALUES($1, $2, $3, $4, $5)
    returning *
  `,
};

export default userModel;
