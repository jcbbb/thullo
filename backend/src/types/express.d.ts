declare namespace Express {
    export interface Request {
        user: import('../models/user.model').IUser;
    }
}