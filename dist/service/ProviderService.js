"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginProvider = exports.registerProvider = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
const comparePasswordService_1 = __importDefault(require("./comparePasswordService"));
const registerProvider = (data, callback) => {
    const procInsertProviderQuery = 'call insertProvider (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@message_text)';
    try {
        configdb_1.default.query(procInsertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider, data.neighborhood,
            data.street, data.number_street, data.number_provider], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.registerProvider = registerProvider;
const loginProvider = (data, callback) => {
    const getProviderQuery = 'call get_data_provider(?);';
    try {
        configdb_1.default.query(getProviderQuery, [data.email_provider], (error, results) => {
            if (error) {
                return callback(error);
            }
            let claveAlmacenada = results[0][0].password_provider;
            let verificar = (0, comparePasswordService_1.default)(data.password_provider, claveAlmacenada);
            callback(null, verificar);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.loginProvider = loginProvider;
