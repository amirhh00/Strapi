import { GraphqlCtx } from "../../../../@types/graphQl.type";
import { core, convertSDL } from "nexus";
import customerGraphql from "./schema";
import { print } from "graphql/language/printer";

const typesFactories = [customerGraphql];

export default (context: GraphqlCtx): any[] => {
  return typesFactories.map((sdl) => convertSDL(print(sdl)));
};
