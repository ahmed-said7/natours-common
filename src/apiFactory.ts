import mongoose, {Model,Query} from "mongoose";
export interface Pobulate {
    path: string;
    select: string;
};
export interface t {
    page?:string;
    sort?:string;
    select?:string;
    limit?:string;
    keyword?:string;
};


import { Request , Response , NextFunction } from "express";
import { apiError } from "./apiError";
import { apiFeatures } from "./apiFeatures";
import { subjectType } from "./enums";

declare global{
    namespace Express {
        interface Request {
            filterObj?: { [key:string] : string };
        }
    }
}

export interface Publisher<d> {
    publish(data:d):void;
    channelName:subjectType;
};


export class apiFactory <T,m extends t,h> {
    private publisherCreated: Publisher<h> | undefined =undefined;
    private publisherUpdated: Publisher<h> | undefined =undefined;
    private publisherDeleted: Publisher<h> | undefined =undefined;
    constructor( public model:Model<T> , public options?: Pobulate ){};
    
    setPublisher( publisherCreated?: Publisher<h>,publisherUpdated?: Publisher<h>,publisherDeleted?: Publisher<h>){
        this.publisherCreated=publisherCreated;
        this.publisherUpdated=publisherUpdated;
        this.publisherDeleted=publisherDeleted;
    };
    async getOne(req:Request<{id:string},{},{},{}>,res:Response,next:NextFunction){
        let query=this.model.findOne({ _id:req.params.id }) as Query<T,T>;
        if ( this.options ) {
            query=query.populate(this.options) as Query<T,T>;
        };
        const data=await query;
        if(!data){
            return next(new apiError('doc not found',400));
        };
        res.status(200).json({data});
    };
    async createOne(req:Request,res:Response,next:NextFunction){
        let data=await this.model.create( req.body ) as h;
        if(!data){
            return next(new apiError('doc not found',400));
        };
        if(this.publisherCreated){
            this.publisherCreated.publish(data);
        };
        res.status(200).json({data});
    };
    async updateOne(req:Request<{id:string},{},{},{}>,res:Response,next:NextFunction){
        let data=await this.model.findByIdAndUpdate( req.params.id , req.body , {new:true} ) as h;
        if(!data){
            return next(new apiError('doc not found',400));
        };
        if(this.publisherUpdated){
            this.publisherUpdated.publish(data);
        };
        res.status(200).json({data});
    };
    async deleteOne(req:Request<{id:string},{},{},t>,res:Response,next:NextFunction){
        let data=await this.model.findByIdAndDelete(req.params.id) as h;
        if(!data){
            return next(new apiError('doc not found',400));
        };
        if(this.publisherDeleted){
            this.publisherDeleted.publish(data) ;
        };
        res.status(200).json({sttus:"Deleted"});
    };
    async getAll(req:Request<{},{},{},m>,res:Response,next:NextFunction){
        let filterObj={};
        if(req.filterObj){
            filterObj=req.filterObj;
        };
        const {paginationObj,query}=await new apiFeatures< T , m >( this.model.find() , req.query  )
            .filter(filterObj)
            .sort().select()
            .pagination();
        const data=await query;
        if(data.length == 0){
            res.status(200).json({data:[]});
        };
        res.status(200).json({data,pagination:paginationObj});
    };
};