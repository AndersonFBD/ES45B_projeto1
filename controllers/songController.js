const songServices = require("../services/songServices");

exports.getAllSongs = async (req, res) => {
  let page = Number(req.query.page[0]);
  let limit = Number(req.query.limit[0]);
  console.log(limit);
  const library = await songServices.listAllSongs(page, limit);
  res.status(200).json(library);
};

exports.findById = async (req, res) => {
  const song = await songServices.getSongById(Number(req.params.id));

  if (!song) {
    res.status(404).json({ erro: "nenhuma musica encontrada" });
  }

  res.status(200).json(song);
};

exports.addSong = async (req, res) => {
  await songServices.addNewSong(req.body);
  console.log(req.body);
  res.status(201).json({ "música adicionada": req.body });
};

exports.updateSong = async (req, res) => {
  const song = await songServices.editSong(req.params.id, req.body);
  if (!song) {
    res.status(404).json({ erro: "nenhuma musica encontrada" });
  } else {
    res.status(200).json(song);
  }
};

exports.deleteSong = async (req, res) => {
  const song = await songServices.removeSong(req.params.id);

  if (!song) {
    res.status(404).json({ error: "nenhuma musica encontrada" });
  } else {
    res.status(200).json({ message: "musica removido", musica: song });
  }
};
