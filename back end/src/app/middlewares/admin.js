const adminMiddleware = (request, response, next) => {
  const isUserAdmin = request.userIsAdmin;

  if (isUserAdmin !== true) {
    return response.status(403).json({
      error: 'Admin access required',
    });
  }

  next();
};

export default adminMiddleware;