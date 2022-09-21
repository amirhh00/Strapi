import type { GraphqlCtx } from "../../../../@types/graphQl.type";
import { apiUID } from "..";

import customer from "./customer";

export default (ctx: GraphqlCtx) => {
  // const { naming } = strapi.plugin("graphql").service("utils");
  const queries = {
    customers: customer,
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
