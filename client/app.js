
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessagForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');


let userName = '';

loginForm.addEventListener('submit', function login(e) {
  e.preventDefault();
  if (userNameInput.value.length > 0) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show')
  } else {
    alert('Wrong! Please fill the name first!')
  }
}
)

addMessagForm.addEventListener('submit', function sendMessage(e) {
  e.preventDefault();
  if (messageContentInput.value.length > 0) {
    addMessage(userName, messageContentInput.value)
    messageContentInput.value = '';
  } else {
    alert('Wrong! Please type message first!')
  }

})

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message')
  message.classList.add('message--recived')
  if (author === userName) {
    message.classList.add('message--self')
  }
  message.innerHTML = `
  <h3 class="message__author">${userName === author ? 'You' : author}</h3>
  <div class="message__content">
    ${content}
  </div>
`;
  messagesList.appendChild(message);
}

