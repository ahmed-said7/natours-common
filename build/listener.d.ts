import { Stan, Message } from "node-nats-streaming";
import { subjectType } from "./enums";
export interface l {
    subject: subjectType;
    data: any;
}
export declare abstract class listener<T extends l> {
    private _client;
    abstract queueGroupName: string;
    abstract channelName: T['subject'];
    constructor(_client: Stan);
    get client(): Stan;
    options(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): T['data'];
    abstract onEvent(data: T['data'], msg: Message): void;
}
//# sourceMappingURL=listener.d.ts.map