"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::customer.customer", ({ strapi }) => {
    return {
        async find(ctx) {
            const userCtx = ctx.state.user;
            if (!userCtx)
                throw new Error("user does not exist");
            const customers = await strapi.db
                .query("api::customer.customer")
                .findMany({
                populate: {
                    marketer: true,
                },
                where: {
                    marketer: {
                        id: { $eq: userCtx.id },
                    },
                },
            });
            ctx.body = customers;
            return;
        },
    };
});
