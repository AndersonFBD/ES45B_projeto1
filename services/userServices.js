const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

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
  if (!user.isAdmin) user.isAdmin = false;
  let uid = Number(userList.length) + 1;
  console.log(user);
  const newUser = { uid, ...user };
  userList.push(newUser);

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    // return newUser;
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

exports.removeUser = async (uid) => {
  let userList = await getuserList();
  const user_index = userList.findIndex((user) => user.uid === uid);
  if (user_index === -1) {
    return null;
  }

  userList.splice(user_index, 1)[0];

  await fs.writeFile("../data/users.json", JSON.stringify(userList), (err) => {
    if (err) {
      console.error(err);
    } else {
      return userList[user_index];
    }
  });
};

exports.login = async (req, res) => {
  const userList = await getuserList();
  const { username, password } = req.body;
  try {
    const payload = userList.find(
      (user) => user.username === username && user.password == password
    );
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    console.log("token: " + token);
    return { auth: true, token: token };
  } catch (error) {
    return { auth: false, error: error };
  }
};
