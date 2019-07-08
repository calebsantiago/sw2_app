"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var connection_1 = __importDefault(require("../connection"));
var providerMock_1 = require("./../mock/providerMock");
var clientMock_1 = require("./../mock/clientMock");
var quotationMock_1 = require("../mock/quotationMock");
describe('app test', function () {
    beforeAll(function () {
        var db = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
        connection_1.default({ db: db });
    });
    afterAll(function (done) {
        mongoose_1.default.disconnect(done);
    });
    it('findclientbyid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyid('5d228ba5834d870dec4450be')];
                case 1:
                    response = _a.sent();
                    result = 'caleb';
                    if (response != null) {
                        expect(response.name.firstname).toEqual(result);
                    }
                    else {
                        expect(response).toEqual(null);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findproviderbyemail', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyemail('nada@gmail.com')];
                case 1:
                    response = _a.sent();
                    result = 'nada@gmail.com';
                    if (response != null) {
                        expect(response.account.email).toEqual(result);
                    }
                    else {
                        expect(response).toEqual(null);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findclientbyphonenumber', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clientMock_1.ClientMock.getInstance().findbyphonenumber(997754390)];
                case 1:
                    response = _a.sent();
                    result = 997754390;
                    if (response != null) {
                        expect(response.phonenumber).toEqual(result);
                    }
                    else {
                        expect(response).toEqual(null);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findproviderbyservice', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, providerMock_1.ProviderMock.getInstance().findbyservicesaveragerate('panadería')];
                case 1:
                    response = _a.sent();
                    result = 'panadería';
                    if (response.length > 0) {
                        expect(response[0].service.title).toEqual(result);
                    }
                    else {
                        expect(response).toEqual([]);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findquotationbyid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findbyid('5d155393fae8d20017d78b74')];
                case 1:
                    response = _a.sent();
                    result = 'panadería';
                    if (response != null) {
                        expect(response.service).toEqual(result);
                    }
                    else {
                        expect(response).toEqual(null);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findcheckbyclient', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findcheckbyclient('5d228ba5834d870dec4450be')];
                case 1:
                    response = _a.sent();
                    result = 'panadería';
                    if (response.length > 0) {
                        expect(response[0].service).toEqual(result);
                    }
                    else {
                        expect(response).toEqual([]);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('findhistorybyprovider', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, quotationMock_1.QuotationMock.getInstance().findhistorybyprovider('5cd093b9c1b14913e87bd2e4')];
                case 1:
                    response = _a.sent();
                    result = 'panadería';
                    if (response.length > 0) {
                        expect(response[0].service).toEqual(result);
                    }
                    else {
                        expect(response).toEqual([]);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
