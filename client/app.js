const socket = io();

socket.on("message", ({ author, content }) => addMessage(author, content));

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

  if (!userNameInput.value) {
    return alert("Please fill login input with your's name!");
  } else {
    userName = userNameInput.value;

    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
  }
};

addMessageForm.addEventListener("submit", (e) => {
  sendMessage(e);
});

const sendMessage = (e) => {
  e.preventDefault();

  if (!messageContentInput.value) {
    return alert("To send message you must fill input with content!");
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit("message", { author: userName, content: messageContent });
    messageContentInput.value = "";
  }
};

const addMessage = (author, content) => {
  const message = document.createElement("li");
  message.classList.add("message", "message--recived");

  if (author === userName) message.classList.add("message--self");

  message.innerHTML = `
<h3 class="message__author">${author === userName ? "You" : author}</h3>
<div class="message__content">${content}</div>
`;

  messagesList.appendChild(message);
};
