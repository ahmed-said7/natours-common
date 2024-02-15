import {Stan,Message} from "node-nats-streaming";
import { subjectType } from "./enums";

interface m {
    subject:subjectType;
    data: any;
};


export abstract class listener<T extends m> {
    abstract queueGroupName:string;
    abstract channelName:T['subject'];
    constructor(private _client:Stan){};
    get client(){
        if( ! this._client ){
            throw new Error('client not available');
        };
        return this._client;
    };
    options(){
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(this.queueGroupName);
    }
    listen(){
        const subscribtion=this.client.subscribe(this.channelName,this.queueGroupName,this.options());
        subscribtion.on('mesage',function(msg:Message){
            const data=this.parseMessage(msg) as T['data'];
            this.onEvent(data,msg);
        });
    };
    parseMessage(msg:Message){
        const data=msg.getData();
        if( typeof data==='string' ){
            return JSON.parse(data);
        };
    };
    abstract onEvent( data:T['data'] , msg:Message ):void;
};