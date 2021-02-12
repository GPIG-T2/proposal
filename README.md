# Interface Proposal

This repository contains our proposal for the interface between the Virus and WHO models.

The interface is designed with the attempt to have no bias as to the implementation of both the virus of WHO models. The concepts presented in this document are intended to be interpreted as abstractions over the function of the models themselves, they are not meant to be considered as a reference for the implementation of either the virus or WHO models.

## Proposal

This proposal has 3 main sections:

1. JSON structures used for the interface
2. REST interface
3. WebSocket interace

The REST and WebSocket interfaces are alternatives for the method of communication the interface will use between both models. The reasoning for including both is explained further on.

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

As the Virus model runs on specific time-steps, which are explicitly defined in the parameters in terms of real-world timings, it also seems reasonable to allow a more asyncronous method of communication, in which the Virus model can perform its simulation continuously, and inform the WHO model of each new timestep, without needing to wait for the WHO model to directly interact and fetch this data.
