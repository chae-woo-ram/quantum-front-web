const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const router = require('./router');
const { getRooms, addUser, removeUser, getUser, getUsersInRoom, addRoom } = require('./users');

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://10.0.1.146:3000'],
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: 'http://10.0.1.146:3000' }));
app.use(router);

io.on('connection', (socket) => {
  console.log('새로운 유저가 접속했습니다.');

  socket.on('join', ({ name, room, profileId }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, profileId });
    console.log('error', error);
    if (error) return callback({ error: '에러가 발생했습니다.' });

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, ${user.room}에 오신 것을 환영합니다.`,
    });

    socket.join(user.room);

    // 방에 있는 모든 사용자에게 새로운 사용자 입장을 알림
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name}님이 입장했습니다.`,
      createdAt: new Date(),
    });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', ({ message, file }, callback) => {
    console.log('socket', socket.id);
    const user = getUser(socket.id);
    io.to(user?.room).emit('message', {
      user: user?.name,
      profileId: user?.profileId,
      text: message,
      file: file,
      createdAt: new Date(),
    });

    callback();
  });

  // 방 생성 이벤트를 처리하는 코드
  socket.on('createRoom', (roomName, callback) => {
    addRoom(roomName);
    // 방 생성 후 방 목록을 모든 클라이언트에 브로드캐스트
    io.emit('roomListUpdate', getRooms());
    callback();
  });

  socket.on('getRooms', (callback) => {
    const rooms = getRooms();
    callback(rooms);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name}님이 퇴장하셨습니다.`,
        createdAt: new Date(),
      });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }

    console.log('유저가 나갔습니다.');
  });
});

server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`));
