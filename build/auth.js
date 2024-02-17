"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("./apiError");
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    ;
    if (!token) {
        return next(new apiError_1.apiError('token not found', 400));
    }
    ;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.jwt_secret);
    const user = {
        email: decoded.email, password: decoded.password, role: decoded.role,
        passwordChangedAt: decoded.passwordChangedAt, active: decoded.active,
        _id: decoded._id
    };
    if (user.passwordChangedAt) {
        const timestamp = user.passwordChangedAt.getTime() / 1000;
        if (timestamp > decoded.iat) {
            return next(new apiError_1.apiError('login again ', 400));
        }
        ;
    }
    ;
    // if( ! user.active ){
    //     return next(new apiError('account is not active ',400));
    // };
    req.user = user;
    return next();
}));
const allowedTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new apiError_1.apiError('you are not allowed to access route', 400));
    }
    ;
    return next();
};
exports.allowedTo = allowedTo;
