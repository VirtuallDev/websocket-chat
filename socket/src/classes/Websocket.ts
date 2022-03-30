import { Server } from 'http';
import { Server as socketServer } from 'socket.io';
import { ClientEvents, EmitEvents } from '../typings';
const WEBSOCKET_CORS = {
   origin: "*",
   methods: ["GET", "POST"]
}


class Websocket extends socketServer<ClientEvents, EmitEvents> {
    private static io: Websocket;

    constructor(httpServer: Server){
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static getInstance(httpServer?:Server): Websocket {
        if(!Websocket.io && httpServer){ Websocket.io = new Websocket(httpServer);}
        return Websocket.io;
    }
}

export default Websocket;