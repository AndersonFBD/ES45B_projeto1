const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "../data", "songs.json");

const Artistfilepath = path.join(__dirname, "../data", "artists.json");

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

const getArtistList = async () => {
  try {
    const data = await fs.readFile(Artistfilepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro na leitura na base de dados:", err);
    throw err;
  }
};

exports.listAllSongs = async (page, limit) => {
  await initialize();
  const allSongs = await readSongFile();
  let resultPage = allSongs.slice((page - 1) * limit, limit * page);
  return resultPage;
};

exports.getSongById = async (id) => {
  await initialize();
  let songs = await readSongFile();
  let result = songs.find((song) => song.id === id);
  console.log(result);
  return result;
};

exports.findByTitle = async (title) => {
  await initialize();

  if (String(title).trim() === "") {
    return "nenhum termo buscado";
  } else {
    let allSongs = await readSongFile();
    let results = allSongs.filter((song) =>
      String(song.title).toLowerCase().includes(String(title).toLowerCase())
    );

    if (results.length > 0) return results;
    else {
      return "no results";
    }
  }
};

exports.findByArtist = async (artist) => {
  await initialize();

  if (String(artist).trim() === "") {
    return "nenhum termo buscado";
  } else {
    let allSongs = await readSongFile();
    let results = allSongs.filter((song) =>
      String(song.artist).toLowerCase().includes(String(artist).toLowerCase())
    );

    if (results.length > 0) return results;
    else {
      return "no results";
    }
  }
};

exports.findByAlbum = async (album) => {
  await initialize();

  if (String(album).trim() === "") {
    return "nenhum termo buscado";
  } else {
    let allSongs = await readSongFile();
    let results = allSongs.filter((song) =>
      String(song.album).toLowerCase().includes(String(album).toLowerCase())
    );

    if (results.length > 0) return results;
    else {
      return "no results";
    }
  }
};

exports.addNewSong = async (song) => {
  await initialize();
  const songs = await readSongFile();
  const artistList = await getArtistList();
  let searchArtist = artistList.find((artist) => artist.name == song.artist);

  if (searchArtist) {
    const lastSong = songs[songs.length - 1];
    let id = Number(lastSong ? lastSong.id : 0) + 1;
    const newEntry = { id, ...song };
    songs.push(newEntry);
    let result = newEntry;

    try {
      await fs.writeFile(filepath, JSON.stringify(songs), "utf-8");
      return result;
    } catch (err) {
      console.error(err);
    }
  } else {
    return null;
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
  songLibrary.splice(song_index, 1);

  try {
    await fs.writeFile(filepath, JSON.stringify(songLibrary), "utf-8");
    return removedEntry;
  } catch (err) {
    console.error(err);
    return null;
  }
};
