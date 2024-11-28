const jwt = require("jsonwebtoken");

exports.generateToken = async (req, res, next) => {
  try {
    const payload = req.userFound;
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    console.log("token: " + token);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "houve algum erro na autenticação", error: error });
  }
};
