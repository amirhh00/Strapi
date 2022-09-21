import { factories } from "@strapi/strapi";
import { IUserCtx } from "../../../@types/userContext.type";

export default factories.createCoreController(
  "api::customer.customer",
  ({ strapi }) => {
    return {
      async find(ctx) {
        const userCtx = ctx.state.user as IUserCtx;
        if (!userCtx) throw new Error("user does not exist");
        const customers = await strapi.db
          .query("api::customer.customer")
          .findMany({
            populate: <any>{
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
  }
);
