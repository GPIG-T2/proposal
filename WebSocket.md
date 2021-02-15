# WebSocket Outline

This document outlines the WebSocket interface version of this proposal.

## Messages

Each message is made of a single base `[Request](websocket.ts#L41)` object. This object can be in 4 forms:

- Get
- Create
- Update
- Delete

Each message form is distingushed by the `kind` property. The `reference` property is the reference string of the data you are attempting to manage, and the `specifics` property is used to list the IDs of any specific objects you are attempting to fetch.

Messages are responded to using the `[Response](websocket.ts#L58)` object. This object will have the `data` property set if it succeeded, or the `error` property set if the request failed.

Every request and reponse has a `nonce` property, which is a custom string set by the request message to keep track of the response message (in order to allow asyncronous messaging if needed).

## References

Kind: `get`
Reference: `area`
Specifics: none

> Returns: [`Area[]`](models.ts#L78)

Kind: `get`
Reference: `area`
Specifics: `[area id]`

> Returns: [`Area`](models.ts#L78) or error if `area id` is not found

Kind: `get`
Reference: `link`
Specifics: none

> Returns: [`TransportLink[]`](models.ts#L91)

Kind: `get`
Reference: `link`
Specifics: `[link id]`

> Returns: [`TransportLink`](models.ts#L91) or error if `link id` is not found
