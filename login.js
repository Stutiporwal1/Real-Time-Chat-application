const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const hint = document.getElementById("username-hint");
const joinBtn = document.getElementById("join-btn");

// Live validation
usernameInput.addEventListener("input", () => {
  if (usernameInput.value.length < 3) {
    hint.style.color = "red";
    joinBtn.disabled = true;
    joinBtn.style.opacity = "0.6";
  } else {
    hint.style.color = "green";
    joinBtn.disabled = false;
    joinBtn.style.opacity = "1";
  }
});
