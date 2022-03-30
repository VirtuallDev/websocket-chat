export type Channel = {
    name: string,
    ownerName: string,
    currentUsers: User[],
    maxUsers: number,
}

type User = {
    name: string
}

export interface ClientEvents {
    message: (message: {content: string, author: string}) => void;
    channelCreation: (channel: Channel) => void;
    userCreation: (user: User) => void;
    channelJoin: (channel: Channel, user: User) => void;
}    

export interface EmitEvents {
    message: (message: {content: string, author: string}) => void;
    userLoaded: (user: User) => void;
    channelsLoaded: (channels: Channel[]) => void;
}
