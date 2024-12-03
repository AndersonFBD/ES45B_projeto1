const artistServices = require("../services/artistServices");

exports.getAll = async (req, res) => {
  const AllArtists = await artistServices.getAllArtists();
  res.status(200).json(AllArtists);
};

exports.findOneArtist = async (req, res) => {
  const artist = await artistServices.findOneArtist(Number(req.params.id));

  if (!artist) {
    res
      .status(404)
      .json({ erro: "nenhum artista encontrado com a id especificada" });
  }

  res.status(200).json(user);
};

exports.addArtist = async (req, res) => {
  await artistServices.addNewArtist(req.body);
  console.log(req.body);
  res.status(201).json({ "artista adicionado": req.body });
};
