
const FactModel = require("../database/schema/factSchema");

const postFact = async (req, res) => {
  const body = req.body;
  try {
    const fact = await FactModel.create(body);
    res.status(200).send(fact);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Error");
  }
};

const getFact = async (req, res) => {
  try {
    const fact = await FactModel.find({});
    res.status(200).send(fact);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

const getUserFacts = async (req, res) => {
  const userID = req.params.userID;
  try {
    const userFacts = await FactModel.find({ UserID: userID });
    res.status(200).send(userFacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Error");
  }
};

const deleteFact = async (req, res) => {
  const factID = req.params.factID;
  try {
    await FactModel.findByIdAndDelete(factID);
    res.status(200).send("Successfully deleted");
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

const putFact = async (req, res) => {
  const factID = req.params.factID;
  const body = req.body;
  try {
    const updatedFact = await FactModel.findByIdAndUpdate(
      factID,
      { title: body.title, text: body.text },
      { new: true }
    );
    res.status(200).send(updatedFact);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

const addLikes = async (req, res) => {
  const factID = req.params.factID;
  const userID = req.params.userID;
  try {
    const fact = await FactModel.findById(factID);
    const updatedDislikes = fact.Dislikes.filter((id) => id !== userID);
    const isUserAlreadyLiked = fact.Likes.includes(userID);
    const updatedLikes = isUserAlreadyLiked
      ? fact.Likes
      : [...fact.Likes, userID];

    const updatedFact = await FactModel.findByIdAndUpdate(
      factID,
      {
        Dislikes: updatedDislikes,
        Likes: updatedLikes,
      },
      { new: true }
    );
    res.status(200).send(updatedFact);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

const disLikes = async (req, res) => {
  const factID = req.params.factID;
  const userID = req.params.userID;
  try {
    const fact = await FactModel.findById(factID);
    const updatedLikes = fact.Likes.filter((id) => id !== userID);
    const isUserAlreadyLiked = fact.Dislikes.includes(userID);
    const updatedDislikes = isUserAlreadyLiked
      ? fact.Dislikes
      : [...fact.Dislikes, userID];

    const updatedFact = await FactModel.findByIdAndUpdate(
      factID,
      {
        Dislikes: updatedDislikes,
        Likes: updatedLikes,
      },
      { new: true }
    );
    res.status(200).send(updatedFact);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

module.exports = {
  postFact,
  getFact,
  getUserFacts,
  deleteFact,
  putFact,
  addLikes,
  disLikes,
};
