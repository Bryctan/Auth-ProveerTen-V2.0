"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGrocer = exports.registerGrocer = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
const comparePasswordService_1 = __importDefault(require("./comparePasswordService"));
const registerGrocer = (data, callback) => {
    const procInsertGrocerQuery = 'call insertGrocer (?,?,?,?,?,?,?,?,?,?,?,@message_text);';
    try {
        configdb_1.default.query(procInsertGrocerQuery, [
            data.email_grocer, data.name_grocer, data.last_name_grocer, data.name_store, data.city_grocer, data.password_grocer,
            data.number_grocer, data.neighborhood, data.street, data.number_street, data.apartment
        ], (error, results) => {
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
exports.registerGrocer = registerGrocer;
const loginGrocer = (data, callback) => {
    const getGrocerQuery = 'call get_data_grocer(?);';
    try {
        configdb_1.default.query(getGrocerQuery, [data.email_grocer], (error, results) => {
            if (error) {
                return callback(error);
            }
            let claveAlmacenada = results[0][0].password_grocer;
            let verificar = (0, comparePasswordService_1.default)(data.password_grocer, claveAlmacenada);
            callback(null, verificar);
        });
    }
    catch (error) {
        return callback(error);
    }
};
exports.loginGrocer = loginGrocer;
