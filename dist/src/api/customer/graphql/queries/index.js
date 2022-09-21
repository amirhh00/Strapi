"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./customer"));
exports.default = (ctx) => {
    // const { naming } = strapi.plugin("graphql").service("utils");
    const queries = {
        customers: customer_1.default,
    };
    return ctx.nexus.extendType({
        type: "Query",
        definition(t) {
            for (const [name, getConfig] of Object.entries(queries)) {
                t.field(name, getConfig(ctx));
            }
            // t.field(
            //   "customers",
            //   customer({
            //     ctx,
            //     type: ctx.nexus.list("Customer"),
            //     // type: "Customer",
            //   })
            // );
        },
    });
};
