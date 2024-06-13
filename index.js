var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: {
        origin: true
    }
});
var totalRooms = {};
io.on('connection', function (socket) {
    console.log("Client connected. socket : ".concat(socket.id));
    socket.on('join', function (data) {
        if (!(data === null || data === void 0 ? void 0 : data.room))
            return;
        socket.join(data.room);
        if (!totalRooms[data.room]) {
            totalRooms[data.room] = { users: [] };
        }
        totalRooms[data.room].users.push(socket.id);
        socket.room = data.room;
        console.log("Join room ".concat(data.room, ". Socket ").concat(socket.id));
    });
    socket.on('offer', function (data) {
        socket.to(data.room).emit('offer', { sdp: data.sdp, sender: socket.id });
    });
    socket.on('answer', function (data) {
        socket.to(data.room).emit('answer', { sdp: data.sdp, sender: socket.id });
    });
    socket.on('candidate', function (data) {
        socket.to(data.room).emit('candidate', { candidate: data.candidate, sender: socket.id });
    });
    socket.on('disconnect', function () {
        if (socket.room && totalRooms[socket.room]) {
            totalRooms[socket.room].users = totalRooms[socket.room].users.filter(function (id) { return id !== socket.id; });
            if (totalRooms[socket.room].users.length === 0) {
                delete totalRooms[socket.room];
            }
        }
        console.log('Client disconnection');
    });
});
server.listen(5000, function () {
    console.log('Listening on port 5000');
});
