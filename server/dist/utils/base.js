"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemTable = exports.userTable = void 0;
const airtable_1 = __importDefault(require("airtable"));
const base = new airtable_1.default({ apiKey: "keyBWG40HPgmSBX7w" }).base("appSacyTKuS38n1zT");
const userTable = base("Users");
exports.userTable = userTable;
const itemTable = base("Items");
exports.itemTable = itemTable;
//# sourceMappingURL=base.js.map