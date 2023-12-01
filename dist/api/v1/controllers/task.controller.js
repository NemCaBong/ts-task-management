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
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const pagination_1 = require("../../../helpers/pagination");
const search_1 = require("../../../helpers/search");
const task_model_1 = __importDefault(require("../../../models/task.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = {
            deleted: false,
        };
        if (req.query.status) {
            find.status = req.query.status.toString();
        }
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toString();
            sort[sortKey] = req.query.sortValue;
        }
        const totalTasks = yield task_model_1.default.countDocuments(find);
        const paginationObj = (0, pagination_1.paginationHelper)({
            currentPage: 1,
            limitItems: 5,
        }, req.query, totalTasks);
        const searchObj = (0, search_1.searchHelper)(req.query);
        if (searchObj.keyword) {
            find.title = searchObj.keywordRegex;
        }
        const tasks = yield task_model_1.default.find(find)
            .sort(sort)
            .limit(paginationObj.limitItems)
            .skip(paginationObj.skip);
        res.json({
            total: totalTasks,
            data: tasks,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            deleted: false,
            _id: id,
        });
        res.json(task);
    }
    catch (error) {
        res.json({
            code: 400,
            error: error.message,
        });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        yield task_model_1.default.updateOne({ _id: id }, { status: status });
        res.json({ code: 200, message: "Cập nhật trạng thái thành công!" });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật trạng thái không thành công! " + error.message,
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Key;
        (function (Key) {
            Key["STATUS"] = "status";
            Key["DELETED"] = "deleted";
        })(Key || (Key = {}));
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case Key.STATUS:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
                res.json({
                    code: 200,
                    message: "Cập nhật nhiều trạng thái thành công!",
                });
                break;
            case Key.DELETED:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    deleted: true,
                    deletedAt: new Date(),
                });
                res.json({
                    code: 200,
                    message: "Xóa nhiều tasks thành công!",
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại! ",
                });
                break;
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật nhiều trạng thái không thành công! " + error.message,
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        const data = yield task.save();
        res.json({
            code: 200,
            message: "Tạo sản phẩm mới thành công",
            data: data,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Tạo tasks lỗi " + error.message,
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: "Chỉnh sửa sản phẩm thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Chỉnh sửa thất bại " + error.message,
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: "Xóa task thành công",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa tasks thất bại " + error.message,
        });
    }
});
exports.deleteTask = deleteTask;
