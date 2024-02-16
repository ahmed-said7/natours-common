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
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiFactory = void 0;
;
;
const apiError_1 = require("./apiError");
const apiFeatures_1 = require("./apiFeatures");
;
class apiFactory {
    constructor(model, options) {
        this.model = model;
        this.options = options;
        this.publisherCreated = undefined;
        this.publisherUpdated = undefined;
        this.publisherDeleted = undefined;
    }
    ;
    setPublisher(publisherCreated, publisherUpdated, publisherDeleted) {
        this.publisherCreated = publisherCreated;
        this.publisherUpdated = publisherUpdated;
        this.publisherDeleted = publisherDeleted;
    }
    ;
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.model.findOne({ _id: req.params.id });
            if (this.options) {
                query = query.populate(this.options);
            }
            ;
            const data = yield query;
            if (!data) {
                return next(new apiError_1.apiError('doc not found', 400));
            }
            ;
            res.status(200).json({ data });
        });
    }
    ;
    createOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.model.create(req.body);
            if (!data) {
                return next(new apiError_1.apiError('doc not found', 400));
            }
            ;
            if (this.publisherCreated) {
                this.publisherCreated.publish(data);
            }
            ;
            res.status(200).json({ data });
        });
    }
    ;
    updateOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!data) {
                return next(new apiError_1.apiError('doc not found', 400));
            }
            ;
            if (this.publisherUpdated) {
                this.publisherUpdated.publish(data);
            }
            ;
            res.status(200).json({ data });
        });
    }
    ;
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.model.findByIdAndDelete(req.params.id);
            if (!data) {
                return next(new apiError_1.apiError('doc not found', 400));
            }
            ;
            if (this.publisherDeleted) {
                this.publisherDeleted.publish(data);
            }
            ;
            res.status(200).json({ sttus: "Deleted" });
        });
    }
    ;
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterObj = {};
            if (req.filterObj) {
                filterObj = req.filterObj;
            }
            ;
            const { paginationObj, query } = yield new apiFeatures_1.apiFeatures(this.model.find(), req.query)
                .filter(filterObj)
                .sort().select()
                .pagination();
            const data = yield query;
            if (data.length == 0) {
                res.status(200).json({ data: [] });
            }
            ;
            res.status(200).json({ data, pagination: paginationObj });
        });
    }
    ;
}
exports.apiFactory = apiFactory;
;
