import type { Response, NextFunction, Request } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {

    return next()
    
  } catch (error) {

  }
};

export default authMiddleware;
