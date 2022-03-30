const socket = io("http://localhost:3000");

const sendMessage = (content, author) => {
    socket.emit("message", { content, author });
}
