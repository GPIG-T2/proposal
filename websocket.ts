/*

  Nonces are used to allow the client to distingush what each response message was for. Responses will always have the same nonce as the request it is reponding to.

*/
import { integer } from "./models";

interface GetRequest {
  nonce: string;
  kind: "get";
  reference: string;
  specifics?: integer[];
}

interface CreateRequest<T> {
  nonce: string;
  kind: "create";
  reference: string;
  specifics?: integer[];
  data: T;
}

interface UpdateRequest<T> {
  nonce: string;
  kind: "update";
  reference: string;
  specifics?: integer[];
  data: T;
}

interface DeleteRequest {
  nonce: string;
  kind: "delete";
  reference: string;
  specifics?: integer[];
}

/**
 * The request object that is sent to the server-side.
 */
export type Request<T> =
  | GetRequest
  | CreateRequest<T>
  | UpdateRequest<T>
  | DeleteRequest;

interface ValidResponse<T> {
  nonce: string;
  error?: undefined | null;
  data: T;
}

interface ErrorResponse {
  nonce: string;
  error: object;
  data?: undefined | null;
}

/**
 * The response object that the client receives.
 */
export type Response<T> = ValidResponse<T> | ErrorResponse;
