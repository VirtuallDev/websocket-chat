/// <reference types="node" />
import { Server } from 'http';
import { Server as socketServer } from 'socket.io';
declare class Websocket extends socketServer {
    private static io;
    constructor(httpServer: Server);
    static getInstance(httpServer?: Server): Websocket;
}
export default Websocket;
