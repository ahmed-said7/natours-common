import {Stan} from "node-nats-streaming";
import { subjectType } from "./enums";

interface m {
    subject:subjectType;
    data: any;
};

export abstract class listener<T extends m> {
    abstract channelName:subjectType;
    constructor(private _client:Stan){};
    listen(data:T['data']){
        return new Promise<void>( (resolve, reject) => {
            this._client.publish(this.channelName,JSON.stringify(data),function(err){
                if(err){
                    return reject(err);
                }
                return resolve();
            });
            // resolve();
        });
    };
};