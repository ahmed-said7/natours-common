/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
export interface Pobulate {
    path: string;
    select: string;
}
export interface t {
    page?: string;
    sort?: string;
    select?: string;
    limit?: string;
    keyword?: string;
}
import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            filterObj?: {
                [key: string]: string;
            };
        }
    }
}
export declare class apiFactory<T, m extends t> {
    model: Model<T>;
    options: Pobulate | null;
    constructor(model: Model<T>, options: Pobulate | null);
    getOne(req: Request<{
        id: string;
    }, {}, {}, {}>, res: Response, next: NextFunction): Promise<void>;
    createOne(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateOne(req: Request<{
        id: string;
    }, {}, {}, {}>, res: Response, next: NextFunction): Promise<void>;
    deleteOne(req: Request<{
        id: string;
    }, {}, {}, t>, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request<{}, {}, {}, m>, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=apiFactory.d.ts.map