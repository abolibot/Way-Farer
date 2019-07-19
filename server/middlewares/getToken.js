const getToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return next();
  } return res.status(401).json({ status: 401, error: 'You need a token to access this route' });
};

export default getToken;
