"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listener = void 0;
;
class listener {
    constructor(_client) {
        this._client = _client;
    }
    ;
    listen(data) {
        return new Promise((resolve, reject) => {
            this._client.publish(this.channelName, JSON.stringify(data), function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
            // resolve();
        });
    }
    ;
}
exports.listener = listener;
;
