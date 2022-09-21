"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkBadRequest_1 = __importDefault(require("../../../../utils/checkBadRequest"));
exports.default = ({ nexus, strapi }) => {
    return {
        type: nexus.list("Customer"),
        args: {},
        description: "get user's customer",
        async resolve(parent, args, context) {
            const { user } = context.state;
            const { koaContext } = context;
            await strapi.api["customer"].controller("customer").find(koaContext);
            if (!user) {
                throw new Error("Authentication requested");
            }
            (0, checkBadRequest_1.default)(koaContext.body);
            return koaContext.body;
        },
    };
};
