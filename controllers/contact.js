const Contact = require('../models/Contact')

exports.createContact = (req, res, next) => {
    const contactObject = JSON.parse(req.body.contact);
    delete contactObject._id;
    const contact = new Contact({
        ...contactObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    contact.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.modifyContact = (req, res, next) => {
    const contactObject = req.file ? {
        ...JSON.parse(req.body.contact),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete contactObject._userId;
    Contact.findOne({_id: req.params.id})
        .then((contact) => {
            if (contact.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Contact.updateOne({ _id: req.params.id}, { ...contactObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteContact = (req, res, next) => {
    Contact.findOne({ _id: req.params.id})
        .then(contact => {
            if (contact.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = contact.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Contact.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.getAllContacts = (req, res, next) => {
    Contact.find()
    .then(contacts => res.status(200).json(contacts))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneContact = (req, res, next) => {
    //req.params.id
    Contact.findOne({ _id: req.params.id })
        .then(contact => res.status(200).json(contact))
        .catch(error => res.status(404).json({ error }))
}