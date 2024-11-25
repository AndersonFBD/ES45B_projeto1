const uModel = require("../models/userModel");

exports.listAllUsers = () => uModel.findAllUsers();

exports.findUserById = () => uModel.findUserById(uid);

exports.createUser = (user) => uModel.addUser(user);

exports.updateUser = (uid, updatedUser) => uModel.editUser(uid, updatedUser);

exports.deleteUser = (uid) => uModel.removeUser(uid);
