import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface CustomRequest extends Request {
  user?: any;
}

export const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction):void => {
  const token = req.cookies.authtoken;
  if (!token) {res.status(401).json({ message: 'Unauthorized' });
    return;
}

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded ;
    // const authToken = getCookieValue('authtoken');
    // console.log('Auth Token:', authToken);
    next();
  } catch (err) {
     res.status(401).json({ message: 'Invalid Token' });
     return;
  }
};
function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
