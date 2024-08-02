const users = [];
const rooms = {}; // 방 목록을 저장할 객체

const addRoom = (roomName) => {
  if (!rooms[roomName]) {
    rooms[roomName] = { users: [] };
  }
  return rooms;
};

// This is the function that will be called when a user joins a room
const addUser = ({ id, name, room, profileId }) => {
  // Clean the data
  name = name.trim().toLowerCase();
  room = room?.trim().toLowerCase();
  profileId = profileId || 1;

  // Validate name and room
  if (!name || !room) return { error: '이름과 방이 필요해요.' };

  // Store user
  const user = { id, name, room, profileId };
  users.push(user);

  // Update rooms object
  if (!rooms[room]) {
    rooms[room] = { users: [] };
  }
  rooms[room].users.push(user);

  return { user };
};

// This is the function that will be called when a user leaves a room
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const [user] = users.splice(index, 1);

    // Update rooms object
    if (rooms[user.room]) {
      rooms[user.room].users = rooms[user.room].users.filter((u) => u.id !== id);

      // Delete the room from rooms object if it's empty
      if (rooms[user.room].users.length === 0) {
        delete rooms[user.room];
      }
    }

    return user;
  }
};

// This is the function that will be called when a user sends a message
const getUser = (id) => users.find((user) => user.id === id);

// This is the function that will be called when a user sends a message
const getUsersInRoom = (room) => {
  return rooms[room] ? rooms[room].users : [];
};

// Function to get all rooms
const getRooms = () => {
  return rooms;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms, addRoom };
