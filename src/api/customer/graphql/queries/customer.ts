import { FieldOutConfig } from "nexus/dist/definitions/definitionBlocks";
import { GraphqlCtx } from "../../../../@types/graphQl.type";
import checkBadRequest from "../../../../utils/checkBadRequest";

export default ({ nexus, strapi }: GraphqlCtx): FieldOutConfig<any, any> => {
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
      checkBadRequest(koaContext.body);
      return koaContext.body;
    },
  };
};
