const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "../data", "users.json");

const getuserList = async () => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
    throw err;
  }
};

exports.findAllUsers = async () => {
  let userList = await getuserList();
  return userList;
};

exports.findUserById = async (id) => {
  let userList = await getuserList();
  let identifiedUser = userList.find((user) => user.uid === id);
  console.log(identifiedUser);
  return identifiedUser;
};

exports.addUser = async (user) => {
  let userList = await getuserList();
  let id = Number(userList.length) + 1;
  const newUser = { id, ...user };
  userList.push(newUser);

  try {
    await fs.writeFile(filepath, JSON.stringify(userList));
    return newUser;
  } catch (err) {
    console.error(err);
  }
};

exports.editUser = async (uid, editedUser) => {
  let userList = await getuserList();
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
