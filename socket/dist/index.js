"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Websocket_1 = __importDefault(require("./classes/Websocket"));
var http_1 = require("http");
var routing_controllers_1 = require("routing-controllers");
var port = process.env.PORT || 4000;
var routingControllerOptions = {
    routePrefix: 'v1',
    validation: true,
    classTransformer: true,
    cors: true,
    defaultErrorHandler: true
};
var app = (0, routing_controllers_1.createExpressServer)(routingControllerOptions);
app.listen(port, function () { return console.log("listening in port " + port); });
var httpServer = (0, http_1.createServer)(app);
var io = Websocket_1.default.getInstance(httpServer);
httpServer.listen(port, function () { return console.log("websocket listening in port " + port); });
