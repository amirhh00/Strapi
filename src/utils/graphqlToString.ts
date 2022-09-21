import { readFile, readFileSync } from "fs";
import { DocumentNode } from "graphql";

export const graphqlToStr = (path: string) => {
  return new Promise<string>((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const graphqlToStrSync = (path: string) => {
  return readFileSync(path, "utf8");
};

export function getGqlString(doc: DocumentNode) {
  return doc.loc && doc.loc.source.body;
}

export default graphqlToStrSync;
