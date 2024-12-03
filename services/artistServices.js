const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const filepath = path.join(__dirname, "../data", "artists.json");

const initialize = async () => {
  let initializedArray = [];
  try {
    await fs.access(filepath);
  } catch (error) {
    await fs.writeFile(filepath, JSON.stringify(initializedArray, null, 2));
  }
};

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
  await initialize();
  const allArtists = await readArtistFile();
  res.status(200).JSON(allArtists);
};

exports.getArtist = async (id) => {
  await initialize();
  let artists = await readArtistFile();
  let result = artists.find((artist) => artist.id === id);
  console.log(result);
  return result;
};

exports.addNewArtist = async (artist) => {
  await initialize();
  const allArtists = await readArtistFile();
  let id = Number(allArtists.length) + 1;
  console.log(artist);
  const newEntry = { id, ...artist };
  userList.push(newEntry);

  try {
    await fs.writeFile(filepath, JSON.stringify(allArtists), "utf-8");
    return newEntry;
  } catch (err) {
    console.error(err);
  }
};
