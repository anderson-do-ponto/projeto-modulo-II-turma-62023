import { Request, Response, NextFunction } from 'express';

const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  console.log(user)

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: User is not an administrator.' });
  }

  next();
};

export default adminAuthMiddleware;
