export interface ServerToClientEvents {
}
export interface ClientMessage {
    name: string;
    content: string;
}
export interface ClientToServerEvents {
    message: (messaeg: ClientMessage) => void;
}
export interface SocketCors {
    origin: "*" | string;
    methods: string[] | ["GET", "POST"];
}
