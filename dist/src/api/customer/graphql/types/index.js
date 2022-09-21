"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const schema_1 = __importDefault(require("./schema"));
const printer_1 = require("graphql/language/printer");
const typesFactories = [schema_1.default];
exports.default = (context) => {
    return typesFactories.map((sdl) => (0, nexus_1.convertSDL)((0, printer_1.print)(sdl)));
};
