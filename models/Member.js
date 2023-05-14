const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  arrondissement: { type: String, required: true },
  commune: { type: String, required: true },
  dateArrete: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  nom: { type: String, required: true },
  num_arrete: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: false },
  prenom: { type: String, required: true },
  province: { type: String, required: true },
  quartier: { type: String, required: true },
  raison: { type: String, required: true },
  pdfArrete: { type: String, required: false },
  pdfDemande: { type: String, required: false },
  DatePostMember:{ type: String, required: true },
  stateMember : { type: Boolean, required: true }
});

module.exports = mongoose.model('Member', contactSchema);