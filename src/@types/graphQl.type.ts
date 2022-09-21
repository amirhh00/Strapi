import type { Strapi } from "@strapi/strapi";
import { core as NexusCore } from "nexus";

export interface GraphqlCtx {
  nexus: typeof NexusCore;
  strapi: Strapi;
}
