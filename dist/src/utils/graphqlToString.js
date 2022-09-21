"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGqlString = exports.graphqlToStr = void 0;
const fs_1 = require("fs");
const graphqlToStr = (path) => {
    return new Promise((resolve, reject) => {
        (0, fs_1.readFile)(path, "utf8", (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.graphqlToStr = graphqlToStr;
const graphqlToStrSync = (path) => {
    return (0, fs_1.readFileSync)(path, "utf8");
};
function getGqlString(doc) {
    return doc.loc && doc.loc.source.body;
}
exports.getGqlString = getGqlString;
exports.default = graphqlToStrSync;
