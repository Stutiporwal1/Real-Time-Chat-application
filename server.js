// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Store users
const users = {};

// Listen for new connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('user joined', (username) => {
        users[socket.id] = username;
        // Broadcast to all other clients that a user has joined
        socket.broadcast.emit('user joined', username);
    });

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        const username = users[socket.id];
        // Broadcast the message to all other clients
        socket.broadcast.emit('chat message', { username: username, message: msg });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        const username = users[socket.id];
        if (username) {
            // Broadcast to all clients that a user has left
            socket.broadcast.emit('user left', username);
            delete users[socket.id];
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
