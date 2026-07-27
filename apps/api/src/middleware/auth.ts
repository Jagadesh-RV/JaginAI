import { Request, Response, NextFunction } from 'express';
import { getToken } from 'next-auth/jwt';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // We need to parse cookies to let next-auth/jwt extract the token if passed via cookies
  // or it will look for Bearer token in headers.
  
  const token = await getToken({ 
    req: req as any, 
    secret: process.env.AUTH_SECRET as string,
    secureCookie: process.env.NODE_ENV === 'production'
  });

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Attach token payload to request for downstream controllers
  req.user = {
    id: token.id as string,
    orgId: token.orgId as string,
    email: token.email as string,
  };

  next();
};
