const fs = require("fs").promises;
const path = require("path");

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

exports.getAllArtists = async (page, limit) => {
  await initialize();
  const allArtists = await readArtistFile();
  let resultPage = allArtists.slice((page - 1) * limit, limit * page);
  return resultPage;
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
  const lastEntry = allArtists[allArtists.length - 1];
  let id = Number(lastEntry ? lastEntry.id : 0) + 1;
  console.log(artist);
  const newEntry = { id, ...artist };
  allArtists.push(newEntry);

  try {
    await fs.writeFile(filepath, JSON.stringify(allArtists), "utf-8");
    return newEntry;
  } catch (err) {
    console.error(err);
  }
};

exports.editArtist = async (id, editedArtist) => {
  let artistCollection = await readArtistFile();
  const artist_index = artistCollection.findIndex(
    (artist) => artist.id === Number(id)
  );
  if (artist_index === -1) {
    return null;
  }
  artistCollection[artist_index] = {
    ...artistCollection[artist_index],
    ...editedArtist,
  };

  try {
    await fs.writeFile(filepath, JSON.stringify(artistCollection), "utf-8");
    return artistCollection[artist_index];
  } catch (err) {
    console.error(err);
  }
};

exports.removeArtist = async (id) => {
  let artistCollection = await readArtistFile();
  const artist_index = artistCollection.findIndex(
    (artist) => artist.id === Number(id)
  );
  if (artist_index === -1) {
    return null;
  }
  let removedEntry = artistCollection[artist_index];
  artistCollection.splice(artist_index, 1)[0];

  try {
    await fs.writeFile(filepath, JSON.stringify(artistCollection), "utf-8");
    return removedEntry;
  } catch (err) {
    console.error(err);
    return null;
  }
};
