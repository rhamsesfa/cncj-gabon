const Member = require("../models/Member");
exports.createMember = (req, res, next) => {
  //arrêté ministériel
  const nameArrete = req.files.pdfArrete[0].path;
  //arrêté ministériel
  const nameDemande = req.files.pdfDemande[0].path;
  //arrêté ministériel
  const namePhoto = req.files.photo[0].path;
  console.log(req.files)
  const memberObject = req.body;
  delete memberObject._id;
  const member = new Member({
    ...memberObject,
    DatePostMember: Date.now(),
    stateMember: false,
    pdfArrete: nameArrete,
  });

  member
    .save()
    .then(() => {
      res.status(201).json({ message: "Member added" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });/**/
};

exports.modifyMember = (req, res, next) => {
  const memberObject = {
    ...JSON.parse(req.body.member),
    DatePostMember: Date.now(),
  };

  Member.findOne({ _id: req.params.id })
    .then((member) => {
      Member.updateOne(
        { _id: req.params.id },
        { ...memberObject, _id: req.params.id }
      )
        .then(() =>
          res
            .status(200)
            .json({ message: "Le member a été modifié avec succès !" })
        )
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteMember = (req, res, next) => {
  Member.findOne({ _id: req.params.id })
    .then((member) => {
      Member.deleteOne({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ message: "Le member a été supprimé avec succès !" });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllMembers = (req, res, next) => {
  Member.find()
    .then((members) => res.status(200).json(members))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneMember = (req, res, next) => {
  //req.params.id
  Member.findOne({ _id: req.params.id })
    .then((member) => res.status(200).json(member))
    .catch((error) => res.status(404).json({ error }));
};
