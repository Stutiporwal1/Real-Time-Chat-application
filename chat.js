// Connect to the Socket.IO server
const socket = io();

const messagesContainer = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Get username from session storage
const username = sessionStorage.getItem('username');
if (!username) {
    // If no username, redirect back to login
    window.location.href = 'index.html';
}

// Notify the server that a new user has joined
socket.emit('user joined', username);

// Listen for chat messages from the server
socket.on('chat message', (data) => {
    appendMessage(data.username, data.message);
});

// Listen for user joined notifications
socket.on('user joined', (username) => {
    appendNotification(`${username} has joined the chat`);
});

// Listen for user left notifications
socket.on('user left', (username) => {
    appendNotification(`${username} has left the chat`);
});


// Handle message submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        // Send message to the server
        socket.emit('chat message', message);
        // Display the message locally for the sender
        appendMessage('You', message);
        messageInput.value = '';
    }
});

// Function to add a message to the chat window
function appendMessage(user, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="user">${user}:</span> <span class="text">${text}</span>`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}

// Function to add a notification to the chat window
function appendNotification(message) {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    notificationElement.innerText = message;
    messagesContainer.appendChild(notificationElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}
