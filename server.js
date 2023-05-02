const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const messages = [];
let users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});



const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('I\'ve added a listener on message event \n');
  socket.on('user', (user) => {
    users.push({ name: user.author, id: socket.id })
    console.log('Users now loged in', users);
    socket.broadcast.emit('message', { author: 'ChatBot', content: user.author + ' has joined the conversation!' });
  })
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => {
    deletedUser = users.find(user => user.id === socket.id)
    if (deletedUser) {
      socket.broadcast.emit('message', { author: 'ChatBot', content: deletedUser.name + ' has left the conversation!' });
    }
    users = users.filter(user => user.id !== socket.id)
    console.log('User disconnected. Users now logged in', users);
  })
});



