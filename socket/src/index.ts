import Websocket from "./classes/Websocket";
import {createServer} from "http";
import { Channel } from './typings';
import {
    createExpressServer,
    RoutingControllersOptions
} from 'routing-controllers';

const port = process.env.PORT || 3000;

let channels: Channel[] = [];

const routingControllerOptions: RoutingControllersOptions = {
   routePrefix: 'v1',
   validation: true,
   classTransformer: true,
   cors: true,
   defaultErrorHandler: true
}

const app = createExpressServer(routingControllerOptions);

const httpServer = createServer(app);

const io = Websocket.getInstance(httpServer);

io.on("connection", socket => {
    socket.emit("channelsLoaded", channels);
    socket.on("message", message => {
        socket.emit("message", message);
    })

    socket.on("userCreation", user => {
        socket.emit("userLoaded", user);
    })

    socket.on("channelJoin", (channel, user) => {
        const channelExists = true ? channels.find(c => c.name === channel.name) : false;
        if(channelExists){
            channels.find(c => c.name === channel.name)?.currentUsers.push(user);
        }

        socket.emit("channelsLoaded", channels);
    })

    socket.on("channelCreation", channel => {
        const userOwnsChannel = true ? channels.find(c => c.ownerName === channel.ownerName) : false;
        if(userOwnsChannel){
            return console.log("user already owns a channel.");
        }

        channels.push(channel);
        socket.emit("channelsLoaded", channels);
        console.log(channels)
    })

})


httpServer.listen(port, () => console.log("websocket listening in port " + port));