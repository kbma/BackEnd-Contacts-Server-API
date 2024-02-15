//API Contacts
const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const ContactModel = require("./Models/Contact");
//Parametres de la cnx a la base
app.use(express.json());

const cors = require("cors");
app.use(cors());



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tozeur');
const db = mongoose.connection;
db.on('error', () => {
    console.log("Erreur");
});
db.once('open', () => {
    console.log("Connexion avec succees");
});
const contactRouter= require('./Routes/Contact');
app.use('', contactRouter);

   const swaggerJSDoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');
   // Définir les options Swagger
   const swaggerOptions = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'API de gestion de contacts',
         version: '1.0.0',
         description: 'Documentation de l\'API de gestion de contacts',
       },
     },
     apis: ['./routes/*.js'], // Spécifiez le chemin des fichiers contenant les routes
   };
   const swaggerSpec = swaggerJSDoc(swaggerOptions);
   // Utiliser Swagger UI
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   



 



// Securiser les API
const jwt = require('jsonwebtoken');
// Clé secrète pour la création et la vérification des JWT
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Utilisation d'une variable d'environnement
// Messages constants
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';
// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());
// Middleware pour gérer l'authentification
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        // Validation des champs requis
        if (!username || !password) {
            throw new Error('Les champs "username" et "password" sont requis.');
        }
        // Dans un véritable cas d'utilisation, vous vérifieriez les informations d'authentification ici
        // Si l'authentification réussit, vous pouvez générer un JWT
        if (username === 'elife' && password === '0000') {
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            res.json({ token, message: SUCCESS_MESSAGE });
        } else {
            res.status(401).json({ message: ERROR_MESSAGE });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});



app.listen(3001, () => {
    console.log(`Serveur demarré http:localhost:${port}`);
});