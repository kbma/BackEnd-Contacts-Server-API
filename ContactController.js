const User = require("./Models/Contact.js");

const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: "Échec de la création de utilisateur" });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Utilisation d'une variable d'environnement
// Messages constants
const ERROR_MESSAGE = 'L\'authentification a échoué';
const SUCCESS_MESSAGE = 'L\'authentification a réussi';// Middleware pour analyser le corps des requêtes au format JSON

const login =async (req,res)=>{
 
    try {
    const { username, password } = req.body;
    // Validation des champs requis
    if (!username || !password) {
    throw new Error('Les champs "username" et "password" sont requis.');
    }// Dans un véritable cas d'utilisation, vous vérifieriez les informations d'authentification ici
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
      }




module.exports = {
  createUser,
  getUsers,
  login
};