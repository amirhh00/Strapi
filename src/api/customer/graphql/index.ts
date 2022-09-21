import type { Strapi } from "@strapi/strapi";
import getTypes from "./types";
import getQueries from "./queries";
// import getMutations from "./mutations";
// const getResolversConfig = require("./resolvers-configs");

export const apiUID = "api::customer:customer";

export default ({ strapi }: { strapi: Strapi }) => {
  const extensionService = strapi.plugin("graphql").service("extension");

  // Disable Permissions queries & mutations but allow the
  // type to be used/selected in filters or nested resolvers
  extensionService.shadowCRUD(apiUID).disableQueries().disableMutations();

  // Disable User & Role's Create/Update/Delete actions so they can be replaced
  const actionsToDisable = ["create", "update", "delete", "read"];

  extensionService.shadowCRUD(apiUID).disableActions(actionsToDisable);

  // Register new types & resolvers config
  extensionService.use(({ nexus }) => {
    const types = getTypes({ strapi, nexus });
    const queries = getQueries({ strapi, nexus });
    // const mutations = getMutations({ strapi, nexus });
    // const resolversConfig = getResolversConfig({ strapi });

    return {
      types: [
        types,
        queries,
        // mutations
      ],
      // resolversConfig,
    };
  });
};
