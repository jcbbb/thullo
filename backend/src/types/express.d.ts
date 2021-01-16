declare namespace Express {
  export interface Request {
    user: import('../interfaces/user.interface').IUser;
  }
}
