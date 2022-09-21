"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
/**
 * Throws an ApolloError if context body contains a bad request
 * @param contextBody - body of the context object given to the resolver
 * @throws ApolloError if the body is a bad request
 */
function checkBadRequest(contextBody) {
    const statusCode = (0, fp_1.getOr)(200, "statusCode", contextBody);
    if (statusCode !== 200) {
        const errorMessage = (0, fp_1.getOr)("Bad Request", "error", contextBody);
        const exception = new Error(errorMessage);
        exception.code = statusCode || 400;
        exception.data = contextBody;
        throw exception;
    }
}
exports.default = checkBadRequest;
