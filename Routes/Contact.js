const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ContactController');



/**
    * @swagger
    * /contact/lister:
    *   get:
    *     summary: Liste des contacts
    *     description: Endpoint pour obtenir la liste des contacts.
    *     responses:
    *       200:
    *         description: Liste des contacts récupérée avec succès.
    *       400:
    *         description: Erreur lors de la récupération de la liste des contacts.
    */

router.get('/contact/lister',controller.listerContact);




/**
 * @swagger
 * /contact/ajouter:
 *   post:
 *     summary: Ajouter un contact
 *     description: Permet d'ajouter un nouveau contact avec nom, téléphone et tags associés.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du contact.
 *                 example: John Doe
 *               tel:
 *                 type: string
 *                 description: Numéro de téléphone du contact.
 *                 example: +1234567890
 *               tags:
 *                 type: array
 *                 description: Liste des tags associés au contact.
 *                 items:
 *                   type: string
 *                   example: famille
 *                   description: Tag associé au contact.
 *     responses:
 *       '200':
 *         description: Contact ajouté avec succès.
 *       '400':
 *         description: Requête invalide, veuillez vérifier les données fournies.
 *       '500':
 *         description: Erreur interne du serveur.
 */

router.post('/contact/ajouter',controller.ajouterContact);



/**
* @swagger
 * /contact/{id}/modifier:
 *   put:
 *     summary: Modifier un contact
 *     description: Endpoint pour modifier un contact.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               tel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact modifié avec succès.
 *       400:
 *         description: Les champs "nom" et "tel" sont requis pour la modification.
 *       404:
 *         description: Aucun contact trouvé avec cet ID.
 *       500:
 *         description: Erreur interne du serveur.
 */



router.put('/contact/:id/modifier',controller.modifierContact);
/**
 * @swagger
 * /contact/{id}/supprimer:
 *   delete:
 *     summary: Supprimer un contact
 *     description: Endpoint pour supprimer un contact.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès.
 *       404:
 *         description: Aucun contact trouvé avec cet ID.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.delete('/contact/:id/supprimer',controller.supprimerContact);



/**
 * @swagger
 * /contact/rechercher:
 *   get:
 *     summary: Rechercher un contact
 *     description: Endpoint pour rechercher un contact par nom et/ou numéro de téléphone.
 *     parameters:
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Nom du contact à rechercher (recherche insensible à la casse).
 *       - in: query
 *         name: tel
 *         schema:
 *           type: string
 *         description: Numéro de téléphone du contact à rechercher.
 *     responses:
 *       200:
 *         description: Résultats de la recherche des contacts.
 *         content:
 *           application/json:
 *             example:
 *               - _id: "65c8172b59a0181f65224090"
 *                 nom: "John Doe"
 *                 tel: "1234567890"
 *                 createdAt: "2024-02-11T00:39:07.910Z"
 *                 updatedAt: "2024-02-11T00:39:07.910Z"
 *                 __v: 0
 *               - _id: "65c8172b59a0181f65224091"
 *                 nom: "Jane Doe"
 *                 tel: "9876543210"
 *                 createdAt: "2024-02-11T00:40:15.789Z"
 *                 updatedAt: "2024-02-11T00:40:15.789Z"
 *                 __v: 0
 *       400:
 *         description: Le nom ou le numéro de téléphone est requis pour la recherche.
 *         content:
 *           application/json:
 *             example:
 *               message: "Le nom ou le numéro de téléphone est requis pour la recherche."
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur."
 */

router.get('/contact/rechercher',controller.rechercherContact);

//Utilisation des routes à l'exterieur
module.exports= router;
