const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const filepath = path.join(__dirname, "../data", "artists.json");

const readArtistFile = async () => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro na leitura na base de dados:", err);
    throw err;
  }
};

exports.getAllArtists = async (req, res) => {
  const allArtists = await readArtistFile();
  res.status(200).JSON(allArtists);
};

exports.getArtist = async (id) => {
  let artists = await readArtistFile();
  let result = artists.find((artist) => artist.id === id);
  console.log(result);
  return result;
};
