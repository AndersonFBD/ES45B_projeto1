const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenLocation = path.join(__dirname, "../data", "currentSession.json");

exports.verifyCredentials = async (req, res, next) => {
  try {
    const tokenfile = await fs.readFile(tokenLocation, "utf-8");
    let jwtObject = JSON.parse(tokenfile);
    try {
      const decoded = jwt.verify(jwtObject.Token, process.env.SECRET);
      req.uid = decoded.uid;
      req.user = decoded.username;
      req.admin = decoded.isAdmin;

      next();
    } catch (error) {
      return res.status(401).send({
        message: "sua sessão expirou/ erro com suas credenciais.",
        error: error,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ error: "sem permissão, efetue login para acessar" });
  }
};
