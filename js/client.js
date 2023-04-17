const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, cls, type) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add(cls);
    msgElement.classList.add(type);
    msgContainer.append(msgElement);
    if (type == 'others') {
        audio.play();
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'msg', 'self');
    socket.emit('send', message);
    msgInput.value = '';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'info', 'note')
})

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'msg', 'others')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'info', 'note')
})
