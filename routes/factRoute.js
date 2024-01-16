const { Router } = require("express");
const factRouter = Router();

const FactModel = require("../database/schema/factSchema");
const {
  postFact,
  getFact,
  deleteFact,
  putFact,
  addLikes,
  disLikes,
  getUserFacts,
} = require("../controller/factController");

factRouter.post("/facts", postFact);
factRouter.get("/facts", getFact);
factRouter.get("/facts/user/:userID", getUserFacts); // New route for getting user-specific facts
factRouter.delete("/facts/:factID", deleteFact);
factRouter.put("/facts/:factID", putFact);
factRouter.post("/addLikes/:factID/:userID", addLikes);
factRouter.post("/disLikes/:factID/:userID", disLikes);

module.exports = factRouter;
