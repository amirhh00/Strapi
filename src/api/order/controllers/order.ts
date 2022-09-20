import { factories } from "@strapi/strapi";
import _ from "lodash";
import { IUserCtx } from "../../../@types/userContext.type";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async find(ctx) {
      const userCtx = ctx.state.user as IUserCtx;
      if (!userCtx) throw new Error("user does not exist");
      const orders = await strapi.db.query("api::order.order").findMany({
        populate: <any>{
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
  })
);

function filterUserData(user: IUserCtx) {
  return _.pick(user, ["id", "username", "email", "role.name"]);
}
