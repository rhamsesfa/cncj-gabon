const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const memberCtrl = require('../controllers/member')
const multer  = require('../middleware/multer-config');

//implémentation du CRUD complet//

//create (création de ressources)
router.post('/', multer, memberCtrl.createMember);
//read (lecture de ressources)
router.get('/:id', auth, memberCtrl.getOneMember);
router.get('/', auth, memberCtrl.getAllMembers);

//update (modification de ressources)
router.put('/:id', auth, memberCtrl.modifyMember);

//delete (suppression de ressources)
router.delete('/:id', auth, memberCtrl.deleteMember);

module.exports = router