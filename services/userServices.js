const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const filepath = path.join(__dirname, "../data", "users.json");
const sessionPath = path.join(__dirname, "../data", "currentSession.json");

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
  const user_index = userList.findIndex((user) => user.uid === Number(uid));
  if (user_index === -1) {
    return null;
  }
  userList[user_index] = { ...userList[user_index], ...editedUser };
  console.log(userList);

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    return userList[user_index];
  } catch (err) {
    console.error(err);
  }
};

exports.removeUser = async (uid) => {
  let userList = await getuserList();
  const user_index = userList.findIndex((user) => user.uid === Number(uid));
  if (user_index === -1) {
    return null;
  }
  let removedUser = userList[user_index];
  console.log(userList[user_index]);
  userList.splice(user_index, 1)[0];

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    return removedUser;
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (loginBody) => {
  const userList = await getuserList();
  const username = loginBody.username;
  const password = loginBody.password;
  try {
    const payload = userList.find(
      (user) => user.username === username && user.password === password
    );
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    await fs.writeFile(sessionPath, JSON.stringify({ Token: token }), "utf-8");

    return { auth: true, token: token };
  } catch (error) {
    return { auth: false, error: error };
  }
};

exports.logout = async () => {
  try {
    await fs.unlink(sessionPath);
    return { message: "deslogado com sucesso" };
  } catch (error) {
    return { message: error };
  }
};
