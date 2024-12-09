const artistServices = require("../services/artistServices");

exports.getAll = async (req, res) => {
  const AllArtists = await artistServices.getAllArtists();
  res.status(200).json(AllArtists);
};

exports.findOneArtist = async (req, res) => {
  const artist = await artistServices.getArtist(Number(req.params.id));

  if (!artist) {
    res
      .status(404)
      .json({ erro: "nenhum artista encontrado com a id especificada" });
  }

  res.status(200).json(artist);
};

exports.addArtist = async (req, res) => {
  await artistServices.addNewArtist(req.body);
  console.log(req.body);
  res.status(201).json({ "artista adicionado": req.body });
};

exports.updateArtist = async (req, res) => {
  const artist = await artistServices.editArtist(req.params.id, req.body);
  if (!artist) {
    res.status(404).json({ erro: "artista não encontrado, tente outra id" });
  } else {
    res.status(200).json(artist);
  }
};

exports.deleteArtist = async (req, res) => {
  const artist = await artistServices.removeArtist(req.params.id);

  if (!artist) {
    res
      .status(404)
      .json({ error: "nenhum artista encontrado com a id especificada" });
  } else {
    res
      .status(200)
      .json({ message: "O seguinte artista foi removido", artista: artist });
  }
};
