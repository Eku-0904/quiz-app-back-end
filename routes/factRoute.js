const { Router } = require('express');
const factRouter = Router()

// const { createUser, loginUser } = require('../controller/userController');
const FactModel = require('../database/schema/factSchema')
const { postFact, getFact, deleteFact, putFact, addLikes, disLikes } = require('../controller/factController')
// const { readFact } = require('../controller/factController')


factRouter.post('/facts', postFact)
factRouter.get('/facts', getFact)
factRouter.delete('/facts/:factID', deleteFact)
factRouter.put('/facts/:factID', putFact)
factRouter.post('/addLikes/:factID/:userID', addLikes)
factRouter.post ('/disLikes/:factID/:userID', disLikes)

module.exports = factRouter


