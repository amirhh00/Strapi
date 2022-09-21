import { getOr } from "lodash/fp";

/**
 * Throws an ApolloError if context body contains a bad request
 * @param contextBody - body of the context object given to the resolver
 * @throws ApolloError if the body is a bad request
 */
function checkBadRequest(contextBody: any) {
  const statusCode = getOr(200, "statusCode", contextBody);

  if (statusCode !== 200) {
    const errorMessage = getOr("Bad Request", "error", contextBody);

    const exception: any = new Error(errorMessage);

    exception.code = statusCode || 400;
    exception.data = contextBody;

    throw exception;
  }
}

export default checkBadRequest;
