declare namespace Express {
  export interface Request {
    user: import('../interfaces/user.interface').IUser;
    request_id: string | string[];
    start_time: number;
  }
}
