# REST Outline

This document outlines the REST interface version of this proposal.

## Endpoints

`GET /areas`

> Returns: [`Area[]`](models.ts#L78)

`GET /areas/:id`

> Returns: [`Area`](models.ts#L78) or 404 status if `id` is not found

`GET /links`

> Returns: [`TransportLink[]`](models.ts#L91)

`GET /links/:id`

> Returns: [`TransportLink`](models.ts#L91) or 404 status if `id` is not found

`GET /layout`

> Returns: [`Layout`](models.ts#L113)

`GET /people`

> Returns: [`Person[]`](models.ts#L128)

`GET /people/:id`

> Returns: [`Person`](models.ts#L128) or 404 status if `id` is not found

`GET /people/:id/contact_trace`

> Returns: [`ContactTrace[]`](models.ts#L138) or 404 status if `id` is not found

`GET /organisations`

> Returns: [`Organisation[]`](models.ts#L150)

`GET /organisation/:id`

> Returns: [`Organisation`](models.ts#L150) or 404 status if `id` is not found

`GET /restrictions`

> Returns: [`Restriction[]`](models.ts#L164)

`GET /restrictions/:id`

> Returns: [`Restriction`](models.ts#L164) or 404 status if `id` is not found

`POST /restrictions`

> Body: [`Restriction`](models.ts#L164) (`id` property is omitted, and ignored on server-side)

> Returns: [`Restriction`](models.ts#L164)

`DELETE /restrictions/:id`

> Returns: 201 (empty body) status or 404 status if `id` is not found
