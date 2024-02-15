const ContactModel = require('../Models/Contact');
const jwt = require('jsonwebtoken');
// Clé secrète pour la création et la vérification des JWT
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Utilisation d'une variable d'environnement
// Lister contact
exports.listerContact = (req, res) => {
    // Vérification du JWT dans l'en-tête Authorization
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'Aucun token fourni' });
      return;
    }
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Token non valide' });
      } else {
        try {
          // Les traitements nécessaires pour lister les contacts
          const liste = await ContactModel.find({}).exec();
          return res.status(200).json({ success: true, liste });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ 
            success: false,
            message: 'Erreur interne du serveur.' 
          });
        }
      }
    });
  };
  