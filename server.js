var express = require('express');
var socket = require('socket.io');
var conectados=0;

var app = express();
var server = app.listen(4000, function(){
  console.log('Escuchando desde el puerto 4000.');
});

app.use(express.static('public'));

var io=socket(server);

//* Se detecta la coneccion entre clientes y servidor y se refleja el movimiento del adversario*//

io.on('connection', function(socket){
  conectados = conectados+1
  socket.emit('Bruh', conectados)
  socket.on('dif', ()=>{
    socket.broadcast.emit('game')
  })
  console.log('Realizada conexión con socket.', socket.id);

  socket.on('mensaje', function(data){
    io.sockets.emit('mensaje', data);
  })
  socket.on('one', ()=>{
    socket.broadcast.emit('one1')
  })
  socket.on('two', ()=>{
    socket.broadcast.emit('two1')
  })
  socket.on('tri', ()=>{
    socket.broadcast.emit('tri1')
  })
  socket.on('fur', ()=>{
    socket.broadcast.emit('fur1')
  })
  socket.on('fai', ()=>{
    socket.broadcast.emit('fai1')
  })
  socket.on('six', ()=>{
    socket.broadcast.emit('six1')
  })
  socket.on('svn', ()=>{
    socket.broadcast.emit('svn1')
  })
  socket.on('ate', ()=>{
    socket.broadcast.emit('ate1')
  })

  socket.on('idlejug1', ()=>{
    socket.broadcast.emit('idlejug1t')
  })

  socket.on('idlejug2', ()=>{
    socket.broadcast.emit('idlejug2t')
  })
});