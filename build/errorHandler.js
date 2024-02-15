"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("./apiError");
;
const handleDuplicateError = (err) => {
    const val = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    return new apiError_1.apiError(` duplicate values ${val} `, 400);
};
const handleValidationError = (err) => {
    const values = Object.values(err.errors).map(ele => ele.message).join("&");
    return new apiError_1.apiError(`Validation errors: ${values} `, 400);
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode)
            .json({ mesage: err.message, status: err.status });
    }
    else {
        res.status(500)
            .json({ mesage: 'something went wrong ', status: 'failed' });
    }
    ;
};
const sendErrorDev = (err, res) => {
    return res.status(200).
        json({ err: err });
};
const errorHandler = function (error, req, res, next) {
    console.log(error);
    if (process.env.node_env === 'development') {
        return sendErrorDev(error, res);
    }
    let objErr = Object.assign({}, error);
    if (objErr.name == 'CastError') {
        objErr = new apiError_1.apiError(`invalid mongoId value ${error.value}`, 400);
    }
    ;
    if (objErr.code == 11000 && objErr.name == 'MongoError') {
        objErr = handleDuplicateError(error);
    }
    ;
    if (objErr.name == 'ValidationError') {
        objErr = handleValidationError(error);
    }
    ;
    sendErrorProd(objErr, res);
};
exports.errorHandler = errorHandler;
