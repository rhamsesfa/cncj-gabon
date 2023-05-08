const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const stuffCtrl = require('../controllers/stuff')
const multer  = require('../middleware/multer-config');

//implémentation du CRUD complet//

//create (création de ressources)
router.post('/', auth, multer, stuffCtrl.createThing);
//read (lecture de ressources)
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);

//update (modification de ressources)
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

//delete (suppression de ressources)
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router