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

exports.findAllUsers = async (page, limit) => {
  const userList = await getuserList();
  let results = userList.slice((page - 1) * limit, limit * page);
  return results;
};

exports.findUserById = async (id) => {
  let userList = await getuserList();
  let identifiedUser = userList.find((user) => user.uid === id);
  return identifiedUser;
};

exports.addUser = async (user) => {
  let userList = await getuserList();
  user.isAdmin = false;
  const lastUser = userList[userList.length - 1];
  let uid = Number(lastUser ? lastUser.uid : 0) + 1;
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

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    return userList[user_index];
  } catch (err) {
    console.error(err);
  }
};

exports.removeUser = async (uid) => {
  if (uid == 1) return { message: "usuario protegido" };
  let userList = await getuserList();
  const user_index = userList.findIndex((user) => user.uid === Number(uid));
  if (user_index === -1) {
    return null;
  }
  let removedUser = userList[user_index];
  userList.splice(user_index, 1)[0];

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    return removedUser;
  } catch (err) {
    console.error(err);
  }
};

//função que gera o token a partir das credenciais fornecidas pelo usuario
//se elas existirem, um token será gerado
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

//destrói o arquivo que contém o token, invalidando o acesso à qualquer página
// que requeira o token para poder acessar
exports.logout = async () => {
  try {
    await fs.unlink(sessionPath);
    return { message: "deslogado com sucesso" };
  } catch (error) {
    return { message: error };
  }
};

//função onde um admin pode criar uma nova conta de admin
exports.createAdmin = async (user) => {
  let userList = await getuserList();
  user.isAdmin = true;
  const lastUser = userList[userList.length - 1];
  let uid = Number(lastUser ? lastUser.uid : 0) + 1;
  const newUser = { uid, ...user };
  userList.push(newUser);

  try {
    await fs.writeFile(filepath, JSON.stringify(userList), "utf-8");
    // return newUser;
  } catch (err) {
    console.error(err);
  }
};
