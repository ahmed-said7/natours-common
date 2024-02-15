"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperInstance = void 0;
const nats = __importStar(require("node-nats-streaming"));
function WrapperInstance(clusterId, clientId, url) {
    class Wrapper {
        constructor(clusterId, clientId, url) {
            this.clusterId = clusterId;
            this.clientId = clientId;
            this.url = url;
            this._client = null;
        }
        ;
        get client() {
            if (!this._client) {
                throw new Error('client not available');
            }
            ;
            return this._client;
        }
        ;
        connect() {
            this._client = nats.connect(this.clusterId, this.clientId, { url: this.url });
            return new Promise((resolve, reject) => {
                this.client.on('error', err => reject(err));
                this.client.on('connect', () => resolve());
            });
        }
        ;
        static Instance(clusterId, clientId, url) {
            return new Wrapper(clusterId, clientId, url);
        }
        ;
    }
    ;
    return Wrapper.Instance(clusterId, clientId, url);
}
exports.WrapperInstance = WrapperInstance;
;
