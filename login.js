document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        // Store username in session storage to use it on the chat page
        sessionStorage.setItem('username', username);
        // Redirect to the chat page
        window.location.href = 'chat.html';
    }
});
