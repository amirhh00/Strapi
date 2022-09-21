"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiUID = void 0;
const types_1 = __importDefault(require("./types"));
const queries_1 = __importDefault(require("./queries"));
// import getMutations from "./mutations";
// const getResolversConfig = require("./resolvers-configs");
exports.apiUID = "api::customer:customer";
exports.default = ({ strapi }) => {
    const extensionService = strapi.plugin("graphql").service("extension");
    // Disable Permissions queries & mutations but allow the
    // type to be used/selected in filters or nested resolvers
    extensionService.shadowCRUD(exports.apiUID).disableQueries().disableMutations();
    // Disable User & Role's Create/Update/Delete actions so they can be replaced
    const actionsToDisable = ["create", "update", "delete", "read"];
    extensionService.shadowCRUD(exports.apiUID).disableActions(actionsToDisable);
    // Register new types & resolvers config
    extensionService.use(({ nexus }) => {
        const types = (0, types_1.default)({ strapi, nexus });
        const queries = (0, queries_1.default)({ strapi, nexus });
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
