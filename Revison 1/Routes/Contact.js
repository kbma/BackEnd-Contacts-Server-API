const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ContactController');
router.get('/contact/lister',controller.listerContact);
//Utilisation des routes à l'exterieur
module.exports= router;
