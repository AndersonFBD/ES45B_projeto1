const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "../data", "songs.json");

const initialize = async () => {
  let initializedArray = [];
  try {
    await fs.access(filepath);
  } catch (error) {
    await fs.writeFile(filepath, JSON.stringify(initializedArray, null, 2));
  }
};

const readSongFile = async () => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro na leitura na base de dados:", err);
    throw err;
  }
};

exports.listAllSongs = async (req, res) => {
  await initialize();
  const allSongs = await readSongFile();
  return allSongs;
};

exports.getSongById = async (id) => {
  await initialize();
  let songs = await readSongFile();
  let result = songs.find((song) => song.id === id);
  console.log(result);
  return result;
};

exports.addNewSong = async (song) => {
  await initialize();
  const songs = await readSongFile();
  const lastSong = songs[songs.length - 1];
  let id = Number(lastSong ? lastSong.id : 0) + 1;
  console.log(song);
  const newEntry = { id, ...song };
  songs.push(newEntry);

  try {
    await fs.writeFile(filepath, JSON.stringify(songs), "utf-8");
    return newEntry;
  } catch (err) {
    console.error(err);
  }
};

exports.editSong = async (id, editedSong) => {
  let songLibrary = await readSongFile();
  const song_index = songLibrary.findIndex((song) => song.id === Number(id));
  if (song_index === -1) {
    return null;
  }
  songLibrary[song_index] = {
    ...songLibrary[song_index],
    ...editedSong,
  };

  try {
    await fs.writeFile(filepath, JSON.stringify(songLibrary), "utf-8");
    return songLibrary[song_index];
  } catch (err) {
    console.error(err);
  }
};

exports.removeSong = async (id) => {
  let songLibrary = await readSongFile();
  const song_index = songLibrary.findIndex((song) => song.id === Number(id));
  if (song_index === -1) {
    return null;
  }
  let removedEntry = songLibrary[song_index];
  songLibrary.splice(song_index, 1)[0];

  try {
    await fs.writeFile(filepath, JSON.stringify(songLibrary), "utf-8");
    return removedEntry;
  } catch (err) {
    console.error(err);
    return null;
  }
};
