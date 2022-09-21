"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const Schema = (0, apollo_server_koa_1.gql) `
  type Customerrr {
    name: String!
  }
`;
exports.default = Schema;
