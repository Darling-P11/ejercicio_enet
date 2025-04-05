declare namespace Express {
    export interface Request {
      user?: {
        userid: number;
        username: string;
        rol: string;
      };
    }
  }
  