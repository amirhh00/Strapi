"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const lodash_1 = __importDefault(require("lodash"));
exports.default = strapi_1.factories.createCoreController("api::order.order", ({ strapi }) => ({
    async find(ctx) {
        const userCtx = ctx.state.user;
        if (!userCtx)
            throw new Error("user does not exist");
        const orders = await strapi.db.query("api::order.order").findMany({
            populate: {
                // users_permissions_user: {
                //   select: ["id", "email", "username"],
                // },
                customer: true,
                order_items: true,
            },
            where: {
                users_permissions_user: {
                    id: { $eq: userCtx.id },
                },
            },
        });
        return { orders };
    },
}));
function filterUserData(user) {
    return lodash_1.default.pick(user, ["id", "username", "email", "role.name"]);
}
