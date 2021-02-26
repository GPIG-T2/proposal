# WebSocket Outline

This document outlines the WebSocket interface version of this proposal.

## Messages

Each message is made of a single base [`Request`](websocket.ts#L41) object. This object can be in 4 forms:

- Get
- Create
- Update
- Delete

Each message form is distingushed by the `kind` property. The `path` property is the path string of the data you are attempting to manage, and the `ids` property is used to list the IDs of any specific objects you are attempting to fetch. If no IDs are given, then all available objects

Messages are responded to using the [`Response`](websocket.ts#L58) object. This object will have the `data` property set if it succeeded, or the `error` property set if the request failed.

Every request and reponse has a `nonce` property, which is a custom string set by the request message to keep track of the response message (in order to allow asyncronous messaging if needed).

## References

---

Kind: `get`

Path: `areas`

IDs: Area IDs

> Data: [`Area[]`](models.ts#L78)

---

Kind: `get`

Path: `links`

IDs: Transport Link IDs

> Returns: [`TransportLink[]`](models.ts#L91)

---

Kind: `get`

Path: `layout`

IDs: none

> Returns: [`Layout`](models.ts#L113)

---

Kind: `get`

Path: `people`

IDs: Person IDs

> Returns: [`Person[]`](models.ts#L128)

---

Kind: `get`

Path: `people.contact_trace`

IDs: Person IDs (requires at least 1)

> Returns: [`ContactTrace[]`](models.ts#L138) or error if `person id` is not found

---

Kind: `get`

Path: `organisations`

IDs: Organisation IDs

> Returns: [`Organisation[]`](models.ts#L150)

---

Kind: `get`

Path: `restrictions`

IDs: Restrictions IDs

> Returns: [`Restriction[]`](models.ts#L164)

---

Kind: `create`

Path: `restrictions`

IDs: none

Data: [`Restriction`](models.ts#L164)

> Returns: [`Restriction`](models.ts#L164) (`id` property is omitted, and ignored on server-side)

---

Kind: `update`

Path: `restrictions`

IDs: Restriction ID (only 1 is allowed)

Data: [`Restriction`](models.ts#L164)

> Returns: [`Restriction`](models.ts#L164) (`id` property is omitted, and ignored on server-side) or error if `restriction id` is not found

---

Kind: `delete`

Path: `restrictions`

IDs: Restriction IDs (at least 1)

> Returns: [`Restriction[]`](models.ts#L164) or error if `restriction id` is not found
