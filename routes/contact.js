const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const contactCtrl = require('../controllers/contact')
const contactCtrl = require('../controllers/contact')
const multer  = require('../middleware/multer-config');

//implémentation du CRUD complet//

//create (création de ressources)
router.post('/', contactCtrl.createContact);
//read (lecture de ressources)
router.get('/:id', auth, contactCtrl.getOneContact);
router.get('/', auth, contactCtrl.getAllContacts);

//update (modification de ressources)
router.put('/:id', auth, contactCtrl.modifyContact);

//delete (suppression de ressources)
router.delete('/:id', auth, contactCtrl.deleteContact);

module.exports = router