const fs = require("fs").promises;
const userList = fs.access(__dirname, "../data/users.json", "utf-8");

let id = Number(userList.length);
exports.findAllUsers = () => userList;

exports.findUserById = (id) => userList.find((user) => user.uid === id);

exports.addUser = (user) => {
  const newUser = { id, ...user };
  userList.push(newUser);
  id++;

  fs.writeFile("../data/users.json", JSON.stringify(userList), (err) => {
    if (err) {
      console.error(err);
    } else {
      return newUser;
    }
  });
};

exports.editUser = (uid, editedUser) => {
  const user_index = userList.findIndex((user) => user.uid === uid);
  if (user_index === -1) {
    return null;
  }
  userList[user_index] = { ...userList[user_index], ...editedUser };
  fs.writeFile("../data/users.json", JSON.stringify(userList), (err) => {
    if (err) {
      console.error(err);
    } else {
      return userList[user_index];
    }
  });
};

exports.removeUser = (uid) => {
  const user_index = userList.findIndex((user) => user.uid === uid);
  if (user_index === -1) {
    return null;
  }

  userList.splice(user_index, 1)[0];

  fs.writeFile("../data/users.json", JSON.stringify(userList), (err) => {
    if (err) {
      console.error(err);
    } else {
      return userList[user_index];
    }
  });
};
