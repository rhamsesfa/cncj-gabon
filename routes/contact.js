const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const contactCtrl = require('../controllers/contact')
const multer  = require('../middleware/multer-config');

//implémentation du CRUD complet//

//create (création de ressources)
router.post('/', auth, multer, contactCtrl.createThing);
//read (lecture de ressources)
router.get('/:id', auth, contactCtrl.getOneThing);
router.get('/', auth, contactCtrl.getAllThings);

//update (modification de ressources)
router.put('/:id', auth, multer, contactCtrl.modifyThing);

//delete (suppression de ressources)
router.delete('/:id', auth, contactCtrl.deleteThing);

module.exports = router