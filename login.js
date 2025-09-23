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

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = usernameInput.value.trim();

  if (username.length >= 3) {
    sessionStorage.setItem("username", username);

    // Little welcome animation before redirect
    joinBtn.innerText = "Welcome!";
    joinBtn.style.background = "linear-gradient(90deg, #28a745, #20c997)";
    setTimeout(() => {
      window.location.href = "chat.html";
    }, 1200);
  }
});

// Enter-to-submit
usernameInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    form.dispatchEvent(new Event("submit"));
  }
});
