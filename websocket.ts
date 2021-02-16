/*

  Nonces are used to allow the client to distingush what each response message was for. Responses will always have the same nonce as the request it is reponding to.

*/
import { integer } from "./models";

interface GetRequest {
  nonce: string;
  kind: "get";
  path: string;
  ids?: integer[];
}

interface CreateRequest<T> {
  nonce: string;
  kind: "create";
  path: string;
  ids?: integer[];
  data: T;
}

interface UpdateRequest<T> {
  nonce: string;
  kind: "update";
  path: string;
  ids?: integer[];
  data: T;
}

interface DeleteRequest {
  nonce: string;
  kind: "delete";
  path: string;
  ids?: integer[];
}

/**
 * The request object that is sent to the server-side.
 */
export type Request<T> =
  | GetRequest
  | CreateRequest<T>
  | UpdateRequest<T>
  | DeleteRequest;

interface ErrorResponse {
  reason: "invalid" | "not_found";
}

interface ValidResponse<T> {
  nonce: string;
  error?: undefined | null;
  data: T;
}

interface ErrorResponse {
  nonce: string;
  error: ErrorResponse;
  data?: undefined | null;
}

/**
 * The response object that the client receives.
 */
export type Response<T> = ValidResponse<T> | ErrorResponse;
