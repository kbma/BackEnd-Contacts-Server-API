const ContactModel = require('../Models/Contact');
const jwt = require('jsonwebtoken');
// Clé secrète pour la création et la vérification des JWT
const secretKey = process.env.SECRET_KEY || 'votreclésecrete'; // Utilisation d'une variable d'environnement
// Lister contact
exports.listerContact = async(req, res) => {  
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
      
  };
  

  exports.ajouterContact= async (req, res) => {
    try {
        // Assurez-vous que les données nécessaires sont présentes dans le corps de la requête
        const { nom, tel } = req.body;
        if (!nom || !tel) {
            return res.status(400).json({
                message: 'Le nom et le téléphone sont requis.'
            });
        }
        // Créer un nouvel objet contact à partir des données de la requête
        const contact = new ContactModel({ nom, tel });
        // Sauvegarder le contact dans la base de données
        const savedContact = await contact.save();
        // Retourner une réponse avec le contact ajouté
        return res.status(200).json({
            message: 'Contact ajouté avec succès.',
            contact: savedContact
        });
    } catch (err) {
        // Gérer les erreurs de manière appropriée
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};


exports.modifierContact= async (req, res) => {
  try {
      const { nom, tel } = req.body; // Utilisation de req.query pour récupérer  les paramètres de la requête
      if (!nom || !tel) {
          return res.status(400).json({ success: false, message: 'Les champs "nom" et "tel" sont requis pour la modification.' });
      }
      // Les traitements nécessaires pour modifier un contact
      const contactUpdated = await ContactModel.findByIdAndUpdate(
          req.params.id,
          { nom, tel },
          { new: true, runValidators: true }
      ).exec();
      if (!contactUpdated) {
          return res.status(404).json({ success: false, message: 'Aucun contact trouvé avec cet ID.' });
      }
      return res.status(200).json({ success: true, contactUpdated });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ 
        success: false,
        message: 'Erreur interne du serveur.',
        erreur: err.log
      });
  }
};



exports.supprimerContact= async (req, res) => {
  try {
      // Les traitements nécessaires pour supprimer un contact
      const contactDeleted = await
          ContactModel.findByIdAndDelete(req.params.id).exec();
      if (!contactDeleted) {
          return res.status(404).json({
              success: false,
              message: 'Aucun contact trouvé avec cet ID.'
          });
      }
      return res.status(200).json({
          success: true,
          contactDeleted
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          success: false,
          message: 'Erreur interne du serveur.'
      });
  }
};

// chercher contact
exports.rechercherContact= async (req, res) => {
  try {
      const { nom, tel } = req.query;
      if (!nom && !tel) {
          return res.status(400).json({ message: 'Le nom ou le numéro de téléphone est requis pour la recherche.' });
      }
      let rechercheParams = {};
      if (nom) {
          rechercheParams.nom = { $regex: new RegExp(nom, 'i') }; // Recherche  insensible à la casse
      }
      if (tel) {
          rechercheParams.tel = tel;
      }
      const resultatsRecherche = await ContactModel.find(rechercheParams).exec();
      return res.status(200).json(resultatsRecherche);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};
