# Interface Proposal

This repository contains our proposal for the interface between the Virus and WHO models.

The interface is designed with the attempt to have no bias as to the implementation of both the virus of WHO models. The concepts presented in this document are intended to be interpreted as abstractions over the function of the models themselves, they are not meant to be considered as a reference for the implementation of either the virus or WHO models.

## Proposal

This proposal has 3 main sections:

1. JSON structures used for the interface
2. REST interface
3. WebSocket interace

The REST and WebSocket interfaces are _alternatives_ for the method of communication for the interface. Only 1 should be selected for the final interface. Justifications for both are provided to allow weighing each properly.

### JSON Structures

The primary JSON structures are defined in the [models](models.ts) file. The format of this defintion is TypeScript, as this is a simple, yet accurate, method of describing the JSON structure itself and the types of all the properties contained within each structure. By using TypeScript, we get generate JSON schemas of all of the structures, which can be used for unit testing the interface within each model, ensuring compatability between allow versions.

### REST Interface

The REST interface is outlined within the [REST](REST.md) document. Each endpoint is described in readable terms, such that it can be easily read and modified as needed. A [swagger](swagger.xml) document is also provided as the concrete deifinition of the REST interface.

#### Justification

REST interfaces are very common with the prevalence of the web, and as such, most programming languages include, or have primary libraries, for creating both a HTTP server and client. With how common this kind of interface is, we would expect most people to understand how to interact with and test them, as well as construct them in the language of choice.

### WebSocket Interface

The WebSockeet interface is outlined within the [WebSocket](WebSocket.md) document. The messages and commands are described in readable terms, such that it can be easlity read and modified as needed. The concrete definitions for the messages are described in the [WebSocket](websocket.ts) definition file, and JSON schemas of these types are also provided to allow for unit testing.

#### Justification

WebSockets are a web standard, meaning that many popular languages (including Python and Java) provide straightforward libraries for creating both the server and client. As the models require constant data transfer to function correctly, it seems resonable to use a method of communication that stays open, and allows a true back-and-forth of data between both sides. The WebSocket standard is also relatively simple, as it provides a method of transmitting text data, similar to HTTP.

As the Virus model runs on specific time-steps, which are explicitly defined in the parameters in terms of real-world timings, it also seems reasonable to allow a more asynchonous, bi-directional method of communication. This would allow the Virus to perform its simulation, and then send a message directly to the WHO model to inform of the end of the tick. The WHO model can then immediately start its simulation, sending and receiving messages to gather data and make changes, and once it is done, it can send a message to inform the Virus model it is complete, at which point the Virus can simulate its turn.

One major benefit of using WebSockets instead of a REST interface is that REST can be fairly complicated to work with on the server-side, and frameworks that aim to reduce this complexity are not designed to have a long-running, queryable process in the background that is the source of the data. WebSockets, however, can be relatively simple, as it is purely a bi-directional text channel. This simplicty can be seen in the Python package [`websocket`](https://websockets.readthedocs.io/en/stable/), where a simple echo server and client uses just the following code:

**Client**

```python
#!/usr/bin/env python

import asyncio
import websockets

async def hello():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello world!")
        await websocket.recv()

asyncio.get_event_loop().run_until_complete(hello())
```

**Server**

```python
#!/usr/bin/env python

import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)

start_server = websockets.serve(echo, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```
