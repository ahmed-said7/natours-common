/// <reference types="qs" />
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user: {
                _id: string;
                email: string;
                password: string;
                role: string;
                passwordChangedAt: Date;
                active: boolean;
            };
        }
    }
}
export interface payload extends JwtPayload {
    _id: string;
    email: string;
    password: string;
    role: string;
    passwordChangedAt: Date;
    active: boolean;
}
export declare const protect: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const allowedTo: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map