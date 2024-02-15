import * as nats from "node-nats-streaming";
import { Stan } from "node-nats-streaming";
export function WrapperInstance(clusterId:string,clientId:string,url:string){
class Wrapper {
    private _client: Stan|null =null;
    constructor(private clusterId:string,private clientId:string,private url:string){};
    get client(){
        if(!this._client){
            throw new Error('client not available');
        };
        return this._client;
    };
    connect(){
        this._client=nats.connect(this.clusterId,this.clientId,{url:this.url});
        return new Promise<void>( (resolve , reject) => {
            this.client.on( 'error'   , err => reject(err)  );
            this.client.on( 'connect' , () => resolve() );
        } );
    };
    static Instance(clusterId:string,clientId:string,url:string){
        return new Wrapper(clusterId,clientId,url);
    };
};
    return Wrapper.Instance(clusterId,clientId,url);
};