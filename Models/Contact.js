const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tel: {
      type: String,
      required: [true, 'Le champ "tel" est requis.'],
      validate: {
        validator: function (value) {
          // Exemple : Valider que le numéro de téléphone est un format valide
          return /^\d{8}$/.test(value);
        },
        message: 'Le numéro de téléphone doit contenir 8 chiffres.',
      },
    },
    avatar: {
      type: String, // Chemin vers le fichier d'avatar (ajuster si nécessaire)
    },
    tags: {
      type: [String], // Tableau de tags associés au contact
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('contacts', ContactSchema);
