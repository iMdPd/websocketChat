const loginForm = document.getElementById("welcome-form"),
  messagesSection = document.getElementById("messages-section"),
  messagesList = document.getElementById("messages-list"),
  addMessageForm = document.getElementById("add-messages-form"),
  userNameInput = document.getElementById("username"),
  messageContentInput = document.getElementById("message-content");

let userName;

loginForm.addEventListener("submit", (e) => {
  login(e);
});

const login = (e) => {
  e.preventDefault();

  if (!userNameInput.value) alert("Hello! I am an alert box!!");
  else {
    userName = userNameInput.value;

    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
  }
};
