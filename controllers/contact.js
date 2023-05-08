const Contact = require('../models/Contact')

exports.createContact = (req, res, next) => {
    const contactObject = req.body;
    delete contactObject._id;
    const contact = new Contact({
        ...contactObject,
        DatePostContact: Date.now()
    });
  
    contact.save()
    .then(() => { res.status(201).json({message: 'Le contact a été ajouté avec succès !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.modifyContact = (req, res, next) => {
    const contactObject = {
        ...JSON.parse(req.body.contact),
        DatePostContact: Date.now()
    };
  
    Contact.findOne({_id: req.params.id})
        .then((contact) => {
                Contact.updateOne({ _id: req.params.id}, { ...contactObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Le contact a été modifié avec succès !'}))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteContact = (req, res, next) => {
    Contact.findOne({ _id: req.params.id})
        .then(contact => {
            Contact.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Le contact a été supprimé avec succès !'})})
                .catch(error => res.status(401).json({ error }));
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