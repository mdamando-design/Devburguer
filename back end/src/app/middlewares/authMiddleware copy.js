import jwt from 'jsonwebtoken';

export default function authMiddleware(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Token not provided or malformed' });
  }

  const token = authorization.replace('Bearer ', '').trim();

  if (!token) {
    return response.status(401).json({ error: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'ce3ccdabbe9a2bf4d9333f45d215990b'
    );

    request.userId = decoded.id;
    request.username = decoded.name;
    request.userIsAdmin= decoded.admin;
    return next();
  } catch {
    return response.status(401).json({ error: 'Invalid or expired token' });
  }
}